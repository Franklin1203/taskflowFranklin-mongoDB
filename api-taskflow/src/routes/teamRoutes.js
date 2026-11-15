
const {Router} = require('express');


const {

    getTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
    getTeamStats
} = require("../controllers/team-controller")


const router = Router()



router.get('/',getTeams);
router.get('/:id',getTeamById);
router.post('/',createTeam);
router.put('/:id',updateTeam);
router.delete('/:id',deleteTeam);
router.get('/:id/stats',getTeamStats);

module.exports = router