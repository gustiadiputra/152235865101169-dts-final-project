import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

// styles
import styles from "./Popular.module.css";

import GameList from "../components/games/GameList";
import Spinner from "../components/ui/Spinner";

const Popular = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  let url = `${process.env.REACT_APP_API_URL}/games?sort-by=popularity`;

  if (selectedCategory) {
    url = `${process.env.REACT_APP_API_URL}/games?sort-by=popularity&category=${selectedCategory}`;
  }

  const { data, isPending, error } = useFetch(url);
  const currentYear = new Date().getFullYear();
  const currentMonth = Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date()
  );

  const categories = [
    "MMORPG",
    "Shooter",
    "Strategy",
    "Moba",
  ];

  return (
    <section className={styles.popular}>
    

      <div className={styles.filter}>
        <label htmlFor="category">Silahkan Pilih Kategory Game:</label>
        <select
          defaultValue="Select Category"
          id="category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option disabled>Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              Top {category}
            </option>
          ))}
        </select>
      </div>

      {isPending && <Spinner />}
      {error && <p>{error}</p>}
      {data && <GameList items={data.slice(0, 20)} />}
    </section>
  );
};

export default Popular;
