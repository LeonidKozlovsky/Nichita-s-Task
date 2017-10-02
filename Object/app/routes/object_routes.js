module.exports = function(app, obj) {

    app.get('/object/:id', function(req, res) {
        for ( let item of obj ) {
            if ( ''+item['id'] === ''+req.params.id ) res.send(item)
        }

        res.send('An error has occourred')
    })

    app.get('/task/:fullname', function(req, res) {
        var person = [];
        const fullName = req.params.fullname;

        for ( let item of obj ) {
            var personFullName = item['firstname'] + item['lastname'];

            if ( personFullName.toLocaleLowerCase() === fullName.toLowerCase() ) person.push(item);
        }

        if ( person.length ) res.send(person)
        else res.send('Error')
    })

    app.get('/task/activity/:fullname', function(req, res) {
        var person = [];
        const fullName = req.params.fullname;

        for ( var item of obj ) {
            var personFullName = item['firstname'] + item['lastname'];

            if ( personFullName.toLocaleLowerCase() === fullName.toLowerCase() ) person.push(item);
        }

        if ( person.length ) {
            var activity = [];

            for ( var i = 0 ; i < person.length ; i++ ) {
                if ( person.length - 1 != i ) {
                    if (person[i]['date'] == person[i + 1]['date']) {
                        if (person[i]['status'] == 'in' && person[i + 1]['status'] == 'out') {
                            var timeOne = person[i]['time'].split(':'); //get time from first person
                            var timeTwo = person[i + 1]['time'].split(':'); //get time from second person
                            var activeTime = 0;

                            activeTime = (( +timeTwo[0] * 60 + +timeTwo[1] ) - ( +timeOne[0] * 60 + +timeOne[1] )) / 60; //active time in hours

                            var result = activeTime - Math.floor(activeTime);

                            var hours = Math.floor(activeTime); // active time hours
                            var minutes = Math.round(result * 60); // active time minutes

                            activity.push({ 'activity': '' + hours + 'h ' + '' + minutes + 'm' });

                            i++;
                        }
                        else {
                            activity.push({ 'brokenActivityID': '' + person[i]['id'] + ' & ' + '' + person[i + 1]['id'] })
                        }
                    }
                    else activity.push({ 'brokenActivityID': '' + person[i]['id'] + ' & ' + '' + person[i + 1]['id'] })
                }
            }
        }
        else res.send('An error was occourred');

        res.send(activity);
    })

    app.post('/object', function(req, res) {
        res.send(obj);
    })

}