import React from 'react';
import ReactDOM from 'react-dom';


let borad = [];
for(let r = 1; r < 13; j++){
    const shelfClass = 'shelf row'+r;
    let hexesToSqueeze = [];
    for(let h = 1; h < 15; h++){
        let hexClass = "hexagon hex_"+h+"_in_row_"+r;
        let hex = 
        <div className={hexClass}
          data-row={r} data-hex={h}>    
            <div className="hexTop"></div>

            <div className="hexBottom">
            </div>
        </div>;
        hexesToSqueeze.push(hex);
    }
    board.push(<div className={shelfClass}>{hexesToSqueeze}</div>);
}


ReactDOM.render(
  board,
  document.getElementById('#app')
);

///npx babel --watch client/code --out-dir client/code --presets react-app/prod