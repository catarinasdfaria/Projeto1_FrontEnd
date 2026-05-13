import { useNavigate } from 'react-router-dom';
import { auth } from "../../Config/firebase";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return <button type="button" className='logout-button' onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;