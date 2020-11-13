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

    let click_on_body = document.querySelector('body');

    click_on_body.addEventListener('click', function(e) {

        if(e.target.id == 'start-here') {
            e.target.style.display = 'none';
            let add_betslip_btn = `<span title="add bet slip column" id="add_column"> + </span>`;
            let initial_content = `<tr id="tblhead"> <td style="width:50px;"> <b>Code </b></td> <td class="options"> <b>Option </b></td> <td class="options"> <b>Option </b></td></tr>
                                   <tr class="row_1 analyze-row"> <td> <input class="code" type="text"></td> <td  class="col_1">  <input type="text"> </td>  <td  class="col_2">  <input type="text"> </td></tr>
                                   <tr class="row_2 analyze-row"> <td> <input class="code" type="text"></td> <td  class="col_1">  <input type="text"> </td>  <td  class="col_2">  <input type="text"> </td> </tr>`;
            
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
            document.getElementById('tt_cols').innerText = `${document.querySelectorAll('#tblhead td').length - 1} tickets`; 
        }

        if(e.target.id == 'add_row') {
            let cols = document.querySelectorAll('#tblhead td').length;
            let rows = document.querySelectorAll('.analyze-row').length;
            let tr = document.createElement('tr');
            tr.classList.add('row_'+(rows + 1));
            tr.classList.add('analyze-row');
            let td = document.createElement('td');
            td.innerHTML = '<input class="code" type="text">';
            tr.appendChild(td);
           
            for($i=1; $i<cols; $i++) { 
                let other_tds = document.createElement('td');
                other_tds.classList.add('col_'+ $i)
                other_tds.innerHTML = '<input type="text">'; 
                tr.appendChild(other_tds);
            }

            document.querySelector('#analyze-table').append(tr);

            document.getElementById('tt_rows').innerText = `${document.querySelectorAll('.code').length} events`
            
        }
        
        if(e.target.tagName == 'INPUT') {
             
        }
    });


})();