(function () {
    let low_risk_options = ['Over H(0.5)', 'Over A(0.5)', 'Over H(1.5)', 'Over A(1.5)', 'Over 1.5', 'Yes, Away score',
                            'Yes, Home Score', 'YHWEH', 'YAWEH', 'X or Over 2.5', 'X2', '1X', 'Under 3.5']

    let rec_options = ['Over H(0.5)', 'Over A(0.5)', 'Over H(1.5)', 'Over A(1.5)', 'Over 1.5', 'Over 2.5', 'Over 5.5 Coners',
                       'Over 6.5 Coners', 'GG', 'NG', 'X', 'X or GG', 'X or Over 1.5', 'X or Over 2.5', 'X2', '1X',
                       'Yes, Home Score', 'No, Home score', 'Yes, Away score', 'YHWEH','YAWEH',
                       'No Away score', 'Under 3.5' ];

    let risky_options = ['GG 2', 'X & GG', 'GG & Over 2.5', '0-1', '0-2', '0-3', '0-4', '1-0', '2-0', '3-0', '4-0', '1-1',
                        '1-2', '1-3', '1-4', '2-1', '2-2', '2-3', '2-4', '3-1','3-2', '3-3', '3-4', '4-1', '4-2', '4-3',
                        '4-4', 'Other'];

    let rec_correction = {
        "GG_2" : { "Advice" : "If you think that two teams are stong enough to score goals also remember that their strength may lead to a stalemate",
                    "rec_options" : [ 'GG & Over 2.5', 'Over A(1.5)', 'Over H(1.5)', 'Over 2.5', 'GG' ]
                  },
        "correct_score" : {"Advice" : "Correct scores are the highest risk games and better played as a single game",
                           "rec_options" : " "
                          },
        "X_&_GG" : { "Advice" : "Correct scores are the highest risk games and better played as a single game",
                    "rec_options" : ['Over 1.5', 'X or Over 2.5', 'X2', '1X', 'GG']
                    }
    }

    let alternate = {
        "1x" : "Yes, Away score",
    }

    let inner_el = `
    <span id="delete_row" class="action_choice border_btm_1">delete row</span>
    <span id="delete_column" class="action_choice border_btm_1">delete column</span>
    <span id="delete_both" class="action_choice border_btm_1">delete both</span>
    <span id="cancel_delete"> close </span>
    `;

    let click_on_body = document.querySelector('body');

    let active_row, active_column;

    let fxn_total_rows = function () {
         document.getElementById('tt_rows').innerText = `${document.querySelectorAll('.code').length} events`
    }

    let fxn_total_cols = function () {
        document.getElementById('tt_cols').innerText = `${document.querySelectorAll('#tblhead td').length - 1} tickets`;
    }

    click_on_body.addEventListener('click', function(e) {


        if(e.target.id == 'start-here') {
            e.target.style.display = 'none';
            let add_betslip_btn = `<span title="add bet slip column" id="add_column"> + </span>`;
            let initial_content = `<tr id="tblhead"> <td style="width:150px;"> <b>Code </b></td> <td class="options"> <b>Option </b></td> <td class="options"> <b>Option </b></td></tr>
                                   <tr class="row_1 analyze-row"> <td> <input class="code" style="width:200px; type="text"></td> <td  class="col_1">  <input type="text"> </td>  <td  class="col_2">  <input type="text"> </td></tr>
                                   <tr class="row_2 analyze-row"> <td> <input class="code"  style="width:200px; type="text"></td> <td  class="col_1">  <input type="text"> </td>  <td  class="col_2">  <input type="text"> </td> </tr>`;

            fxn_add_betslip_BTN = function () {
                document.getElementById('tblhead').lastElementChild.innerHTML = `Option ${add_betslip_btn}`;
            }

            document.getElementById('analyze-table').innerHTML = initial_content;
            fxn_add_betslip_BTN();
            document.getElementById('add_row').style.display = 'inline-block';
            document.getElementById('analyze_now').style.display = 'inline-block';
            document.getElementById('tt_rows').style.display = 'inline-block';
            document.getElementById('tt_cols').style.display = 'inline-block';
        }

        if(e.target.id == 'add_column') {
            let rows = document.querySelectorAll('.analyze-row');
            let cols = document.querySelectorAll('#tblhead td').length;
            rows.forEach( function (x) {
                let y = document.createElement('td');
                y.classList.add( 'col_'+(cols) );
                y.innerHTML = '<input type="text">';
                x.appendChild(y);
            });

            document.getElementById('add_column').remove();
            let td = document.createElement('td');
            td.classList.add('options');
            td.innerHTML = '<b> Option </b>';
            document.getElementById('tblhead').appendChild(td);
            fxn_add_betslip_BTN();
            fxn_total_cols();
            
        }

        if(e.target.id == 'add_row') {
            let cols = document.querySelectorAll('#tblhead td').length;
            let rows = document.querySelectorAll('.analyze-row').length;
            let tr = document.createElement('tr');
            tr.classList.add('row_'+(rows + 1));
            tr.classList.add('analyze-row');
            let td = document.createElement('td');
            td.innerHTML = '<input class="code"  style="width:200px; type="text">';
            tr.appendChild(td);

            for($i=1; $i<cols; $i++) {
                let other_tds = document.createElement('td');
                other_tds.classList.add('col_'+ $i)
                other_tds.innerHTML = '<input type="text">';
                tr.appendChild(other_tds);
            }

            document.querySelector('#analyze-table').append(tr);
            fxn_total_rows();
           
        }

        let fxn_remove_highlight = function () {

            if( document.getElementById('actions_pop') ) { document.getElementById('actions_pop').remove(); }
            let all_inputs = document.querySelectorAll('#analyze-table input[type=text]');

            all_inputs.forEach( function (x) {
                if(x.className != 'code'){ x.style.backgroundColor = 'white';}
            });

        }

        if(e.target.tagName == 'INPUT' && e.target.className != 'code') {

            active_row = e.target.parentElement.parentElement.classList[0];

            active_column = e.target.parentElement.className;

            fxn_remove_highlight();
            //e.target.value = `${e.target.parentElement.parentElement.classList[0]} : ${e.target.parentElement.className}`;
            let affected_area = document.querySelectorAll(`.${e.target.parentElement.parentElement.classList[0]} td, .${e.target.parentElement.className}`);

            affected_area.forEach( function (x) {
              if(x.firstElementChild.className != 'code'){ x.firstElementChild.style.backgroundColor = 'bisque';}
            });

            const actions_pop = document.createElement('div');
            actions_pop.setAttribute('id','actions_pop')
            actions_pop.innerHTML = inner_el;

            e.target.parentElement.prepend(actions_pop);
        }

        if(e.target.id == 'cancel_delete'){
            fxn_remove_highlight();
        }

        let fxn_delete_row = function (x){
            document.querySelector(`.${x}`).remove();
            fxn_remove_highlight();
            
            let a = 1;
            document.querySelectorAll('.analyze-row').forEach(function (x) {
                let w = ['row_'+a, 'analyze-row'];
                let y = x.classList[0];
                let z = x.classList[1];
                x.classList.remove(y);
                x.classList.remove(z);
                x.classList.add(...(w));
                a++;
            });
        }

        let fxn_delete_column = function (x) {

             let i = Number(x.split('_')[1]) + 1;
             document.querySelector(`#tblhead td:nth-child(${i})`).classList.add('yellow');
             document.querySelectorAll(`.${x}`).forEach( function (y){
                 y.classList.add('yellow');
             });


            let y = document.querySelectorAll('.analyze-row').length;
            let z = document.querySelectorAll('#tblhead  td').length - 1;
            let col_start = Number(x.split('_')[1]);
            document.querySelectorAll('.analyze-row').forEach( function (this_row){
                
                this_row.querySelectorAll('td').forEach( function (td) {
                    
                    if( td.className != undefined) {
                        if(Number(td.className.split('_')[1]) > col_start)  {
                            let new_index = Number(td.className.split('_')[1]); 
                            td.classList.add(`col_${new_index - 1}`);
                            td.classList.remove( td.classList[0] );
                        }
                    } 

                } );

            });

            document.querySelectorAll('.yellow').forEach(function (x) {
                x.remove()
            });

        }

        if(e.target.id == 'delete_row') {
            if(confirm ("Sure to delete row")){
                fxn_delete_row(active_row);
                fxn_remove_highlight();
                fxn_total_rows();
                fxn_total_cols();
            }

        }

        if(e.target.id == 'delete_column') {
            if( confirm("Sure to delete column")){
                fxn_delete_column(active_column);
                fxn_remove_highlight();
                fxn_add_betslip_BTN();
                fxn_total_rows();
                fxn_total_cols();
            }
        }

        if(e.target.id == 'delete_both') {
            if(confirm("sure to delete both")) {
                fxn_delete_row(active_row);
                fxn_delete_column(active_column);
                fxn_remove_highlight();
                fxn_add_betslip_BTN();
                fxn_total_rows();
                fxn_total_cols(); 
            }
        }

        if(e.target.id == 'analyze_now'){

            fxn_reset_compare(); 
            document.querySelectorAll('.analyze-row').forEach( function (this_row){
                 
                this_row.querySelectorAll('td').forEach( function (c) { 

                    if(c.className != undefined && c.className != '') {
                    fxn_compare_values(this_row.classList[0], c.className);
                    }

                });

            });
        }

    });
  
   /**
    * 
    * @param {*} currentRow 
    * @param {*} curentCol 
    * the script bellow does cell by cell comparison
    *  let fxn_compare_values = function (currentRow, cureentCol) { 
        document.querySelectorAll(`.${currentRow} td`).forEach( function (td){
            if(td.className != undefined && td.className != '') {
                alert(`compare ${currentRow} { ${cureentCol} : ${td.className} }`);
            }
        });
   }
    * 
    */
   let fxn_reset_compare = function () {

       document.querySelectorAll('.analyze-row td').forEach( function (x) {
            //x.classList.add('white');
            x.style.backgroundColor = 'white';
       });
   }

   let fxn_compare_values = function (currentRow, curentCol) {

        document.querySelectorAll(`.${currentRow} td`).forEach( function (td){

            if(td.className != undefined && td.className != '') {
                
                if( curentCol != td.className ){ 
                    let x = document.querySelector(`.${currentRow} td.${curentCol} input`).value;
                    let y = document.querySelector(`.${currentRow} td.${td.className} input`).value;
                    if( x == y ){ 
                       // td.classList.add('red');
                        td.style.backgroundColor = 'red';
                    } 
                }
            }
        });
   }
    
   click_on_body.addEventListener('mouseenter', function (e) {
       if(e.target.tagName == 'INPUT') {
           alert('Mouse entered input');
       }
   });
})();
