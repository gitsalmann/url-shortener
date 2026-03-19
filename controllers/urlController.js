import { client } from "../config/redis.js";
import { encodeBase62 } from "../utils/base62.js";

export async function shortenUrl(req, res){
    try {
        const {url, customCode} = req.body;
        if(!url){
            return res.status(400).json({error:"URL Required"})
        }
        let shortCode;
        if(customCode){
            const exists = await client.get(customCode)
            if(exists){
                return res.status(400).json({error:"Custom code exists"})
            }
            shortCode = customCode;
        } else {
            const id = await client.incr("url_count");
            shortCode = encodeBase62(id)
        }

        await client.set(shortCode, url)
        await client.set(`${shortCode}:views`, 0)
        res.json({
            shortenUrl:`http://localhost:3000/${shortCode}`,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Server error."})    
    }
}

export async function redirectUrl(req, res) {
  try {
    const { code } = req.params;

    const url = await client.get(code);

    if (!url) {
      return res.status(404).send("Not found");
    }

    await client.incr(`${code}:views`);

    res.redirect(url);

  } catch (err) {
    res.status(500).send("Server error");
  }
}

export async function getStats(req, res) {
  try {
    const { code } = req.params;

    const views = await client.get(`${code}:views`);

    res.json({
      code,
      views: views || 0,
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}