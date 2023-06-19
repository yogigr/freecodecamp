#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

function INSERT_TEAM() {  
  # get team id
  TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$1'")
  # if not found
  if [[ -z $TEAM_ID ]]
  then
    # insert into teams
    INSERT_TEAM_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$1')")
    # get new team_id
    TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$1'")
  fi
  # return team_id
  echo $TEAM_ID
}

# truncate games, teams
echo $($PSQL "TRUNCATE games, teams")

# fetch games.csv
cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  if [[ $YEAR != year ]]
  then
    # get winner_id
    WINNER_ID=$(INSERT_TEAM "$WINNER")
    # get opponent_id
    OPPONENT_ID=$(INSERT_TEAM "$OPPONENT")
    # insert into games
    INSERT_GAMES_RESULT=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES ('$YEAR', '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS)")
    if [[ $INSERT_GAMES_RESULT == 'INSERT 0 1' ]]
    then
      echo Inserted into games, $YEAR $ROUND $WINNER $OPPONENT $WINNER_GOALS $OPPONENT_GOALS
    fi
  fi
done
