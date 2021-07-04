import mongoose from 'mongoose';

import app from './app';
import { mongoUri } from './util/variables.util';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(3000, () => {  
        console.log('Now listening on port 3000');
    });
}).catch(err => console.log(err));
