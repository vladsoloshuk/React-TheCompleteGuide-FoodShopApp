import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

// import DUMMY_MEALS from "./DUMMY_MEALS";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealObj) => {
      const loadedMeals = [];
      for (const key in mealObj) {
        loadedMeals.push({
          id: key,
          name: mealObj[key].name,
          description: mealObj[key].description,
          price: mealObj[key].price
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals(
      {
        url: "https://app-6-movieapp-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      },
      transformMeals
    );
  }, [fetchMeals]);

  if (error) {
    return (
      <section className={classes.mealsError}>
        <Card>
          <p>{error}</p>
        </Card>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <Card>
          <p>Loading...</p>
        </Card>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
