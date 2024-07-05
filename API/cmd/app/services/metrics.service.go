package services

import "gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"

type MetricsService interface {
	GetAllMetrics(*string) (*models.Metrics, error)
	GetCarMetrics(*string) (*models.Car, error)
	GetHomeMetrics(*string) (*models.Home, error)
	GetLifeMetrics(*string) (*models.Life, error)
	GetMetricsByUserId(*string) (*models.Metrics, error)
}
