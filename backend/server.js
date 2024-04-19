const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: './db.sqlite'
})
var db = {}

async function setupDB() {
    try {
        db.Cities = sequelize.define('Cities', { // Model adını Cities olarak değiştirin
            
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            long: {
                type: DataTypes.REAL,
                allowNull: false
            },
            lat: {
                type: DataTypes.REAL,
                allowNull: false
            },
        });
        await sequelize.sync();
    } catch (error) {
        console.error(error);
    }
}

// CREATE APIs URL ENDPOINTS TO CREATE AND DELETE TO DO ITEMS
async function startServer() {
    try {
        await setupDB()
        const port = 3001
        const express = require('express')
        const app = express()
        app.use(cors());
        app.use(express.json())

        app.get('/api', (req, res) => {
            res.send('hello world')
        })



        // GET METHOD API URL | RETRIEVE ITEMS
        app.get('/api/cities', (req, res) => {
            db.Cities.findAll().then(cities => {
                res.json(cities)
            })
        })
        // POST METHOD API URL | CREATE ITEM
        app.post('/api/cities', (req, res) => {
            db.Cities.create(req.body).then( t => {
                res.json(t)
            }) 
        })



        // DELETE METHOD API URL | DELETE ITEM
        app.delete('/api/cities/:state/:city', (req, res) => {
            db.Cities.destroy({
                where: {
                    state: req.params.state,
                    city:req.params.city
                }
            }).then(() => {
                res.sendStatus(204);
            }).catch((error) => {
                console.error(error);
                res.sendStatus(500); 
            });
        });


        app.listen(port, () => {
            console.log(`App listening on port ${port}`) 
        })
    } catch (error) {
        console.error(error);
    }
}
startServer()