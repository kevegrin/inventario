import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

// este jsx nos deja movernos entre las rutas
// material para que se vea bonito

const Navigation = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/inventory">Inventario</Button>
        <Button color="inherit" component={Link} to="/spaces">Espacios</Button>
        <Button color="inherit" component={Link} to= "/reserve">Reservar</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
