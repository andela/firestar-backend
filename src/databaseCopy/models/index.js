import Sequelize from "sequelize";

// create a Sequelize instance

let sequelize;
if (process.env.DATABASE_URL && process.env.NODE_ENV !== "test") {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    operatorsAliases: false
  });
} else {
  if (process.env.DATABASE_URL_TEST && process.env.NODE_ENV === "test") {
    sequelize = new Sequelize(process.env.DATABASE_URL_TEST, {
      dialect: "postgres",
      operatorsAliases: false
    });
  } else {
    sequelize = new Sequelize(
      process.env.DATABASE_URL || process.env.DATABASE,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      {
        dialect: "postgres"
      }
    );
  }
}

// Import the models
const models = {
  User: sequelize.import("./user.js"),
  Login: sequelize.import("./login.js"),
  Reset: sequelize.import("./reset.js")
};

// and combine those models and resolve their associations using the Sequelize API
Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
