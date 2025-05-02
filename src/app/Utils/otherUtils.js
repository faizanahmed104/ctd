import data from "./data.json";

const categories= {};
data.forEach((data) => {
  if (!categories[data.Category]) {
    categories[data.Category] = { sum: 0, count: 0 };
  }
  categories[data.Category].sum += data.EmissionValue;
  categories[data.Category].count++;
});

const uniqueCategories = Object.keys(categories);

const emissionValuesByCategory = uniqueCategories.map((category) => {
  const averageEmissionValue =
    categories[category].sum / categories[category].count;

  return {
    Category: category,
    AverageEmissionValue: averageEmissionValue,
  };
});

export const categoriesLabels = emissionValuesByCategory.map(
  (item) => item.Category
);
export const seriesData = emissionValuesByCategory.map(
  (item) => item.AverageEmissionValue
);
