package services

import (
	"context"
	"errors"

	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

/*
@Author: DevProblems(Sarang Kumar)
@YTChannel: https://www.youtube.com/channel/UCVno4tMHEXietE3aUTodaZQ
*/
type UserServiceImpl struct {
	userCollection *mongo.Collection
	ctx            context.Context
}

func NewUserService(userCollection *mongo.Collection, ctx context.Context) UserService {
	return &UserServiceImpl{
		userCollection: userCollection,
		ctx:            ctx,
	}
}

func (u *UserServiceImpl) GetUser(id *string) (*models.User, error) {
	var user *models.User
	// Convert the string ID to ObjectID
	objID, err := primitive.ObjectIDFromHex(*id)
	if err != nil {
		return nil, err
	}
	// Construct the query to find the user by _id
	query := bson.M{"_id": objID}
	// Execute the query and decode the result into the user variable
	err = u.userCollection.FindOne(u.ctx, query).Decode(&user)
	// Handle any errors that occurred during the query
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (u *UserServiceImpl) UpdateUser(user *models.User) error {
	filter := bson.D{primitive.E{Key: "userID", Value: user.User_id}}
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{Key: "firstName", Value: user.First_name}, primitive.E{Key: "lastName", Value: user.Last_name}, primitive.E{Key: "password", Value: user.Password}, primitive.E{Key: "email", Value: user.Email}, primitive.E{Key: "phoneNo", Value: user.Phone}}}}
	result, _ := u.userCollection.UpdateOne(u.ctx, filter, update)
	if result.MatchedCount != 1 {
		return errors.New("no matched document found for update")
	}
	return nil
}
