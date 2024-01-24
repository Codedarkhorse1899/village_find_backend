import Router from "express";
import OpenAI from "openai";

import { OPENAI_KEY, ORGANIZATION_ID } from "../config";

const router = Router();
const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  organization: ORGANIZATION_ID,
});

router.get("/", async (req, res) => {
  try {
    let message = `Generate ${req.query.count} ${req.query.tone} ${req.query.type} in ecommerce ${req.query.category} field.
    Here is some extra information about generation. ${req.query.prompt}
    Output must be Json format like following.
    ["first result", "second result", "third result", ... ]
    `;
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });
    return res.json({ status: 400, chat });
    // if (chat.error) {
    //   return res.json({ status: 400 });
    // }
    // return res.json({ status: 200, answers: chat.choices[0] });
  } catch (err) {
    return res.json({ status: 500, err });
  }
});

export default router;
