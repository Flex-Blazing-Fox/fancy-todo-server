const axios = require('axios')

class GameController {
    static dota(req, res, next){
        axios.get('https://api.pandascore.co/dota2/tournaments/running', {
            headers: {
                'Authorization': `Bearer ${process.env.TPAPI_GAME}`,
                'Content-Type':'application/json'
            }
        })
        .then(data => {

            let result = data.data.map(el => {
                return {
                    match: el.matches.map(match => { return {
                        id : el.id,
                        league : el.league.name,
                        img : el.league.image_url,
                        series:el.league.id, 
                        match_id:match.id, 
                        begin_at:match.begin_at,
                        match_name:match.name,
                        stream:match.streams,
                        tournament_id:match.tournament_id,
                        status:match.status }})
                }
            })

            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = GameController