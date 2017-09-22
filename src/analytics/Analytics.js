/* eslint-disable */

import Package from '../../package.json';
// import localforage from 'localforage';
import { initFetch, checkResponse } from '../utility';

// Source: https://stackoverflow.com/a/2117523
const uuidv4 = function() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
};

class Analytics {
  constructor (settings) {
    this.baseUrl = settings.baseUrl;
    this.events = [];
    this.sessionID = null;

    /* localforage.config({
      name: 'Nexus Builds',
      driver: localforage.INDEXEDDB,
      storeName: 'nexusbuilds',
      version: 1.0
    });*/
  }

  startSession() {
    this.sessionID = uuidv4();

    const payload = this._createEvent('sessionStart', {
      telemetry: {
        userAgent: navigator.userAgent,
        appVersion: Package.version,
        timeOffset: new Date().getTimezoneOffset(),
      }
    });

    this._saveEvent(payload);
  }

  log(event, data) {
    const payload = this._createEvent(event, data);

    this._saveEvent(payload);
  }

  _createEvent(eventName, data) {
    return Object.assign({}, {
      // id: uuidv4(),
      sessionID: this.sessionID,
      event: eventName,
      time: new Date().toUTCString(),
    }, data ? { data } : {});
  }

  _saveEvent(payload) {
    /* this.events.push(payload);

    localforage.getItem(payload.sessionID)
      .then((value) => {
        if (value) {
          value.push(payload);
          return localforage.setItem(payload.sessionID, value);
        }
        return localforage.setItem(payload.sessionID, [payload]);
      })
      .catch((err) => {
        console.log(err);
      });*/

    this._scheduleUpload(payload);
  }

  _scheduleUpload(payload) {
    // TODO: be smart about uploading and save locally in case of errors
    const opts = initFetch(payload);

    if (!DEVELOPMENT) {
      fetch('http://hots-tool.ddns.net/api/log', opts);
    }
  }
}

export default Analytics;
