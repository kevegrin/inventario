import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

// este jsx nos deja movernos entre las rutas
// material para que se vea bonito

const Navigation = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
        <Button color="inherit" component={Link} to="/spaces">Spaces</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
