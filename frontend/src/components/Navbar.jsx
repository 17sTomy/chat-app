import * as React from 'react';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../context/authContext';
import { jwtDecode  } from 'jwt-decode';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ChatIcon from '@mui/icons-material/Chat';

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")
  
  if (token) {
    const decoded = jwtDecode(token); 
    const user_id = decoded.user_id;
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ChatIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1em',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Chat-App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
            {token === null ? (
                <div>
                  <Link to={`/login`}>
                    <MenuItem key={"login"} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  </Link>
                  <Link to={`/register`}>
                    <MenuItem key={"register"} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Register</Typography>
                    </MenuItem>
                  </Link>
                </div>
              ) : (
                <Link to={`/login`} onClick={logoutUser}>
                  <MenuItem key={"logout"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Link>
              )
            }
            </Menu>
          </Box>
          <ChatIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Chat-App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {token === null ? (
                <>
							    <Link to={`/login`}>
                  	<Button
                  	  key={"login"}
                  	  onClick={handleCloseNavMenu}
                  	  sx={{ my: 2, color: 'white', display: 'block' }}
                  	>
                  	  Login
                  	</Button>
							    </Link>
							    <Link to={`/register`}>
                  	<Button
                  	  key={"register"}
                  	  onClick={handleCloseNavMenu}
                  	  sx={{ my: 2, color: 'white', display: 'block' }}
                  	>
                  	  Register
                  	</Button>
							    </Link>
                </>
              ) : (
							  <Link to={`/login`} onClick={logoutUser}>
                	<Button
                	  key={"logout"}
                	  onClick={handleCloseNavMenu}
                	  sx={{ my: 2, color: 'white', display: 'block' }}
                	>
                	  Logout
                	</Button>
							  </Link>
              )
            }
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              { token !== null && <Avatar src={`http://127.0.0.1:8000/media/${user.image}`} /> }
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;