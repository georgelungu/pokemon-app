import React from "react";

class Scroll extends React.Component 
{
    render()
    {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                alignItems: 'center', 
                flexDirection: 'column' ,
                overflowY: "scroll", 
                border: "1.5px solid black", 
                height: "100vh", 
                width: "100vw", 
            }}>
                {this.props.children}
            </div>
        )
    }
}

export default Scroll