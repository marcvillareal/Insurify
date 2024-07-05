package routes

import (
	"github.com/gin-gonic/gin"
	controller "gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/controllers"
)

// UserRoutes function
func UserRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.POST("/signup", controller.SignUp())
	incomingRoutes.POST("/login", controller.Login())
}
