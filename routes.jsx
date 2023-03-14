import {Routes, Route} from 'react-router-dom';
import Home from './src/pages/Home';
import Historico from './src/pages/Historico';

const Router =() => {
return (
<Routes>

  <Route path='/'  element={<Home/>} />
  <Route path='/historico' element={<Historico/>} />

</Routes>

)

}

export default Router;