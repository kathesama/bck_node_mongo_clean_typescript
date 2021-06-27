import mongoose from 'mongoose';
import testSchema from '../schemas/test.schema';

// por defecto mongo plurifica el nombre del modelo, si se desea que se
// mantenga el nombre se agrega un tercer parametro con el nombre del
// schema que se desee
export default mongoose.model('Prueba', testSchema, 'Prueba');
