'use strict'

const apiKey = "NQjvGKVt9nsgwtzK"
const proxy = "https://cors-anywhere.herokuapp.com/"
const searchURL= `${proxy}http://api.eventful.com/json/events/search?`
const musicEvent = "music"
const sportEvent = "sports"
const sortType = "popularity"

function watchFormMusic() {
    $('#searchFormMusic').submit(event => {
        event.preventDefault();
        const searchLocation = $('#search-query-form').val();
        const maxResults = $('#js-max-results').val();
        getMusicInfo(searchLocation, maxResults);
    });
}

function getMusicInfo(searchQuary, limit = 10) {
    const params = {
        location: searchQuary,
        sort_order: sortType,
        limit,
        app_key: apiKey,
        keywords: musicEvent
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchFormSports() {
    $('#searchFormSports').submit(event => {
        event.preventDefault();
        const searchLocation = $('#search-query-form').val();
        const maxResults = $('#js-max-results').val();
        getSportInfo(searchLocation, maxResults);
    });
}

function getSportInfo(searchQuary, limit = 10) {
    const params = {
        location: searchQuary,
        sort_order: sortType,
        limit,
        app_key: apiKey,
        keywords: sportEvent
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.events.event.length; i++) {
        $('#results-list').append(
            `<span id="eventCard"><ul><h3>${responseJson.events.event[i].title}</h3></ul>
            <li><p>Location: ${responseJson.events.event[i].venue_address} , ${responseJson.events.event[i].city_name} </p></li>
            <li><p>Date and Time: ${responseJson.events.event[i].start_time}</p></li>
            <li><div><a href='${responseJson.events.event[i].url}' target="_blank">More info</a></div></span></li>
            `
        )};
}

$(document).ready(function() {
    watchFormMusic()
    watchFormSports();
});