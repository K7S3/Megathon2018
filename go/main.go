package main

import (
  "encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	// "strconv"
  // "fmt"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
  "github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" 
)
var db *gorm.DB                                         // declaring the db globally
var err error
type Response struct {
	Message string `json:"message"`
}

type Jwks struct {
	Keys []JSONWebKeys `json:"keys"`
}

type JSONWebKeys struct {
	Kty string   `json:"kty"`
	Kid string   `json:"kid"`
	Use string   `json:"use"`
	N   string   `json:"n"`
	E   string   `json:"e"`
	X5c []string `json:"x5c"`
}
type Quiz struct {
  ID uint `json:"id"`
  Name string `json:"name"`
  Genre string `json:"genre"`
}
type User struct {
  ID uint `json:"id"`
  Name string `json:"name"`
  // Method string `json:"method`
}

type Question struct {
  ID uint `json:"id"`
  Question string `json:"question"`
  Option1 string `json:"option1"`
  Option2 string `json:"option2"`
  Option3 string `json:"option3"`
  Option4 string `json:"option4"`
  Answer string `json:"answer"`

}
var jwtMiddleWare *jwtmiddleware.JWTMiddleware

func main() {
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			aud := os.Getenv("AUTH0_API_AUDIENCE")
			checkAudience := token.Claims.(jwt.MapClaims).VerifyAudience(aud, false)
			if !checkAudience {
				return token, errors.New("Invalid audience.")
			}
			// verify iss claim
			iss := os.Getenv("AUTH0_DOMAIN")
			checkIss := token.Claims.(jwt.MapClaims).VerifyIssuer(iss, false)
			if !checkIss {
				return token, errors.New("Invalid issuer.")
			}

			cert, err := getPemCert(token)
			if err != nil {
				log.Fatalf("could not get cert: %+v", err)
			}

			result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))
			return result, nil
		},
		SigningMethod: jwt.SigningMethodRS256,
	})

	jwtMiddleWare = jwtMiddleware
	// Set the router as the default one shipped with Gin
  db, err = gorm.Open("sqlite3", "./gorm.db")
  if err != nil {
      fmt.Println(err)
   }
  defer db.Close()
  db.AutoMigrate(&Question{})
  db.AutoMigrate(&Quiz{})
  db.AutoMigrate(&User{})
  router:= gin.Default()
 

  
  // Start and run the server
  router.PUT("/users/", StoreUser)
  router.GET("/users/", GetUsers)
  router.POST("/quizzes/", CreateQuiz)
  router.GET("/quizzes/", QuizHandler)
  router.GET("/questions/", QuestionHandler)
  router.GET("/questions/:id", DisplayQuestion)
  router.POST("/questions/", CreateQuestion)
  router.DELETE("/quizzes/:id", DeleteQuiz)
  router.DELETE("/questions/:id", DeleteQuestion)
  router.PUT("/questions/:id", UpdateQuestion)
  router.PUT("/quizzes/:id", UpdateQuiz)
  router.Use((cors.Default()))
  router.Run(":8080")

}

func getPemCert(token *jwt.Token) (string, error) {
	cert := ""
	resp, err := http.Get(os.Getenv("AUTH0_DOMAIN") + ".well-known/jwks.json")
	if err != nil {
		return cert, err
	}
	defer resp.Body.Close()

	var jwks = Jwks{}
	err = json.NewDecoder(resp.Body).Decode(&jwks)

	if err != nil {
		return cert, err
	}

	x5c := jwks.Keys[0].X5c
	for k, v := range x5c {
		if token.Header["kid"] == jwks.Keys[k].Kid {
			cert = "-----BEGIN CERTIFICATE-----\n" + v + "\n-----END CERTIFICATE-----"
		}
	}

	if cert == "" {
		return cert, errors.New("unable to find appropriate key")
	}

	return cert, nil
}

// authMiddleware intercepts the requests, and check for a valid jwt token
func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the client secret key
		err := jwtMiddleWare.CheckJWT(c.Writer, c.Request)
		if err != nil {
			// Token not found
			fmt.Println(err)
			c.Abort()
			c.Writer.WriteHeader(http.StatusUnauthorized)
			c.Writer.Write([]byte("Unauthorized"))
			return
		}
	}
}

func CreateQuiz(c *gin.Context) {
  var quiz Quiz
  c.BindJSON(&quiz)
  db.Create(&quiz)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, quiz)
}
func QuizHandler(c *gin.Context) {
  var quiz []Quiz
  if err := db.Find(&quiz).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") 
     c.JSON(200, quiz)  
    }

  }
func StoreUser(c *gin.Context) {

  var user User
  c.BindJSON(&user)
  db.Create(&user)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, user)

}
func GetUsers(c *gin.Context) {
  var user []User
  if err := db.Find(&user).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") 
     c.JSON(200, user)  
    }

}
func UpdateQuestion(c *gin.Context) {
  var question Question
  id := c.Params.ByName("id")
  if err := db.Where("id = ?", id).First(&question).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  }
  c.BindJSON(&question)
  db.Save(&question)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200, question)
}
func UpdateQuiz(c *gin.Context) {
  var quiz Quiz
  id := c.Params.ByName("id")
  if err := db.Where("id = ?", id).First(&quiz).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  }
  c.BindJSON(&quiz)
  db.Save(&quiz)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200, quiz)
}
// QuestionHandler retrieves a list of available questions
func QuestionHandler(c *gin.Context) {
  // quizid := c.Params.ByName("quizid")
  var question []Question
  if err := db.Find(&question).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") 
     c.JSON(200, question)
  }
  }

func DisplayQuestion(c *gin.Context) {
  id := c.Params.ByName("id")
  var question Question
  if err := db.Where("id = ?", id).First(&question).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") 
     c.JSON(200, question)
  }
}

func CreateQuestion(c *gin.Context) {
  var question Question
  c.BindJSON(&question)
  db.Create(&question)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, question)
}

func DeleteQuiz(c *gin.Context) {
  id := c.Params.ByName("id")
  var quiz []Quiz
  d := db.Where("id = ?", id).Delete(&quiz)
  fmt.Println(d)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQuestion(c *gin.Context) {
  id := c.Params.ByName("id")
  var question Question
  d := db.Where("id = ?", id).Delete(&question)
  fmt.Println(d)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, gin.H{"id #" + id: "deleted"})
}