import express from 'express'
import path from 'path'
import handlebars from 'express-handlebars'
import miRouter from '../routes/index';

const app = express();

const publicDir = path.resolve(__dirname, '../../public')
app.use(express.static(publicDir))

const layoutDir = path.resolve(__dirname, '../../views/layouts')

/*  HBS CONFIG  */
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir:layoutDir,   
    extname:'hbs',
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

/* Router */
app.use('/', miRouter)

export default app;