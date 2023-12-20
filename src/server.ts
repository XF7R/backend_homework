import express, { Request, Response } from "express";
import { connectDB, prisma } from "./conflig/db";
import { User, Moive, Comment } from "@prisma/client";

const app = express();
app.use(express.json());
const port = 3306;

connectDB();

//Users --

app.put("/User/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const adduser = req.body as User;
  await prisma.user.update({
    where: {
      id: id,
    },
    data: adduser,
  });
  res.json("user updated");
});

app.put("/User/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const adduser = req.body as User;
  await prisma.user.update({
    where: {
      id: id,
    },
    data: adduser,
  });
  res.json("user updated");
});

app.delete("/User/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.json("user deleted");
});

//Moives --

app.post("/addmovie", async (req: Request, res: Response) => {
  const newuser2 = req.body as Moive;
  await prisma.moive.create({
    data: newuser2,
  });
  return res.json("movie add");
});

app.get("/movie/git", async (req: Request, res: Response) => {
  const users2 = await prisma.moive.findMany();
  return res.json(users2);
});

app.get("/chois/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId1 = await prisma.moive.findMany({
    where: {
      id: id,
    },
    select: {
      title: true,
      duration: true,
      ritings: true,
      genre: true,
    },
  });
  res.json(userId1);
});

app.get("/movie/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId3 = await prisma.moive.findMany({
    where: {
      id: id,
    },
    select: {
      comments: true,
    },
  });
  res.json(userId3);
});

app.get("/movie/:rating", async (req: Request, res: Response) => {
  const users3 = await prisma.moive.findMany();
  return res.json(users3);
});

// comments --

app.post("/addcomment", async (req: Request, res: Response) => {
  const newuser = req.body as Comment;
  await prisma.comment.create({
    data: newuser,
  });
  return res.json("comment added successfully");
});

app.put("/updatecomment/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user4 = req.body as Comment;
  await prisma.user.update({
    where: { id: id },
    data: user4,
  });
  res.json("user updated");
});

app.delete("/deletecomment:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.comment.delete({
    where: { id: id },
  });
  res.json("user deleted");
});
