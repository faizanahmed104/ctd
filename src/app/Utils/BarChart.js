import data from "@/data/data.json";
// const categories : Array<string> = []
//  data.forEach((data) => {
//   if (!categories.includes(data.Category)) {
//     categories.push(data.Category);
//   }
// });

export const categories = {};
data.forEach((data) => {
  if (!categories[data.Category]) {
    categories[data.Category] = true;
  }
});

const uniqueCategories = Object.keys(categories);

export const emissionValuesByCategory = uniqueCategories.map((category) => {
  const totalEmissionValue = data.reduce((acc, data) => {
    if (data.Category === category) {
      return acc + data.EmissionValue;
    }
    return acc;
  }, 0);

  return {
    Category: category,
    TotalEmissionValue: totalEmissionValue,
  };
});

export const categoriesData= emissionValuesByCategory.map(
  (item) => item.Category
);
export const seriesData= emissionValuesByCategory.map(
  (item) => item.TotalEmissionValue
);
