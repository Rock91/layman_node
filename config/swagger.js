const swaggerUi = require("swagger-ui-express");
const expressSwagger = require("express-swagger-generator");

const {
  getFullPath,
  getFileExtension,
  getAllFilesFromFolder,
} = require("../utils/file");
const config = require("./config");
const swaggerConfig = (appOrRouter, { basedir, filedir, files, url }) => {
  // return;
  const fileList = files
    ? files
    : getAllFilesFromFolder(getFullPath(basedir, filedir)).filter(
        (e) => getFileExtension(e) == ".js"
      );

  let swaggerDocument = expressSwagger(appOrRouter)({
    swaggerDefinition: {
      info: {
        description: "This is a sample server",
        title: "Swagger",
        version: "1.0.0",
      },
      servers: [{ url: "http://localhost:6140", description: "Local" }],
      host: config.swagger_host,
      basePath: "/",
      produces: ["application/json", "application/xml"],
      schemes: ["http", "https"],
      securityDefinitions: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "",
        },
      },
    },
    basedir: basedir, //app absolute path
    files: fileList, //Path to the API handle folder
  });
  // console.log("swaggerDocument : ", JSON.stringify(swaggerDocument))
  appOrRouter.use(
    url ? url : "/api-documents",
    swaggerUi.serveFiles(swaggerDocument, {}),
    swaggerUi.setup(swaggerDocument)
  );
};

module.exports = swaggerConfig;
