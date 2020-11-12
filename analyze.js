(function () {

    let click_on_body = document.querySelector('body');

    click_on_body.addEventListener('click', function(e) {

        if(e.target.id == 'start-here') {
            e.target.style.display = 'none';
            let add_betslip_btn = `<span title="add bet slip column" id="add_column"> + </span>`;
            let initial_content = `<tr id="tblhead"> <td style="width:50px;"> <b>Code </b></td> <td class="options"> <b>Option </b></td> <td class="options"> <b>Option </b></td></tr>
                                   <tr class="analyze-row"> <td> <input class="code" type="text"></td> <td>  <input type="text"> </td>  <td>  <input type="text"> </td></tr>
                                   <tr class="analyze-row"> <td> <input class="code" type="text"></td> <td>  <input type="text"> </td>  <td>  <input type="text"> </td> </tr>`;
            
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
            rows.forEach( function (x) {
                let y = document.createElement('td');
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
            let tr = document.createElement('tr');
            tr.classList.add('analyze-row');
            let td = document.createElement('td');
            td.innerHTML = '<input class="code" type="text">';
            tr.appendChild(td);
           
            for($i=1; $i<cols; $i++) { 
                let other_tds = document.createElement('td');
                other_tds.innerHTML = '<input type="text">'; 
                tr.appendChild(other_tds);
            }

            document.querySelector('#analyze-table').append(tr);

            document.getElementById('tt_rows').innerText = `${document.querySelectorAll('.code').length} events`
            
        }

    });
    
    let analyze = document.getElementById('analyze_now');
    
})();