import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, listarUnicoPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})
//const upload = multer({ dest: "./uploads" });

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));

    app.get("/posts", listarPosts);

    app.get("/posts/:id", listarUnicoPosts);

    app.post("/posts", postarNovoPost);

    app.post("/posts/upload", upload.single("imgUrl"), uploadImagem);

    app.put("/posts/upload/:id", atualizarNovoPost);
}

export default routes;
