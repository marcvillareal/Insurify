package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/services"
)

type ClaimsController struct {
	ClaimsService services.ClaimsService
}

func NewClaim(claimsservice services.ClaimsService) ClaimsController {
	return ClaimsController{
		ClaimsService: claimsservice,
	}
}

func (cc *ClaimsController) GetClaimsByUserId(ctx *gin.Context) {
	userID := ctx.Param("user_id")
	claims, err := cc.ClaimsService.GetClaimsByUserId(&userID)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, claims)
}

func (cc *ClaimsController) RegisterClaimsRoutes(rg *gin.RouterGroup) {
	claimsroute := rg.Group("/claims")
	claimsroute.GET("/get/user/:user_id", cc.GetClaimsByUserId)
}
