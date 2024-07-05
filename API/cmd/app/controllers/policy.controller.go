package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/services"
)

type PolicyController struct {
	PolicyService services.PolicyService
}

func NewPolicy(policyservice services.PolicyService) PolicyController {
	return PolicyController{
		PolicyService: policyservice,
	}
}

func (pc *PolicyController) GetPolicyByUserId(ctx *gin.Context) {
	userID := ctx.Param("user_id")
	policy, err := pc.PolicyService.GetPolicyByUserId(&userID)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, policy)
}

func (pc *PolicyController) GetPDFByUserId(ctx *gin.Context) {
	userID := ctx.Param("user_id")
	pdfData, err := pc.PolicyService.ServePDFByUserId(&userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.Data(http.StatusOK, "application/pdf", pdfData)
}

func (pc *PolicyController) RegisterPolicyRoutes(rg *gin.RouterGroup) {
	policyroute := rg.Group("/policy")
	policyroute.GET("/get/user/:user_id", pc.GetPolicyByUserId)
	policyroute.GET("/get/pdf/user/:user_id", pc.GetPDFByUserId)
}
