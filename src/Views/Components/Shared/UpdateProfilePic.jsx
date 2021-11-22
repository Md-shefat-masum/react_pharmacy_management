import axios from 'axios';
import React from 'react'
import { UseAuth } from '../../../Hooks/UseAuth';
import { UseCommonData } from '../../../Hooks/UseCommonData';
let icon_style= {
    height: "40px",
    width: "40px",
    display: "inline-block",
    lineHeight: "40px",
    cursor: 'pointer',
}

function UpdateProfilePic() {
    let { user, set_user } = UseAuth();
    let { calert } = UseCommonData();

    const update_profile_picture = (e) => {
        e.preventDefault();
        // console.log(e.target.files);
        let form_data = new FormData()
        form_data.append('image', e.target.files[0])
        axios.post(`${process.env.REACT_APP_API_LINK}/user/update-profile-pic`,form_data)
            .then(res=>{
                // console.log(res.data);
                let tempUser = {...user};
                tempUser.photoURL = res.data.user.photoURL;
                set_user(tempUser);
                calert(true,'profile pic updated sucessfully','light')
            })
    }
    
    return (
        <div className="user-image">
            <div className="avatar">
                {
                    user?.photoURL ?
                        <img alt="profile" src={user.photoURL} />
                        :
                        <img alt="profile" src="../assets/images/user/11.png" />
                }
            </div>
            <div className="icon-wrapper">
                <form action="#">
                    <label htmlFor="profile_picture_update">
                        <input type="file" onChange={(e)=>update_profile_picture(e)} name="profile_picture_update" id="profile_picture_update" style={{ opacity: 0, visibility: 'hidden',position:'absolute' }} />
                        <i className="icon-pencil" style={icon_style}></i>
                    </label>
                </form>
            </div>

        </div>
    )
}

export default UpdateProfilePic
