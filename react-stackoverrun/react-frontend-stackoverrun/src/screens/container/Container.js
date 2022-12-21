import TopBar from "../../components/top_bar/TopBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
const Container = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('sessionToken') !== null) {
            setLoggedIn(true);
        }
    }, []);

    return (<div className='topBar' data-cy='topBar'>
        <TopBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Outlet context={[loggedIn, setLoggedIn]} />
    </div>
    )
}

export default Container;
