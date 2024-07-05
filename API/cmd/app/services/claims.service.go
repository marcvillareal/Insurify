package services

import "gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"

type ClaimsService interface {
	GetClaimsByUserId(*string) (*models.Claims, error)
}
