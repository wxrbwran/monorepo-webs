// 验证当前浏览器是否支持webrtc
// created by @HenrikJoreteg
/*eslint-disable*/
(function () {

  const localRtc = window.$storage.getItem('rtcSupport');
  // console.log(localRtc, JSON.parse(localRtc));
  if (localRtc) {
    window.rtcSupport = JSON.parse(localRtc);
  } else {
    var prefix;
    var version;

    if (window.mozRTCPeerConnection || navigator.mozGetUserMedia) {
      prefix = 'moz';
      version = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
    } else if (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) {
      prefix = 'webkit';
      version = navigator.userAgent.match(/Chrom(e|ium)/) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
    }

    var PC = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
    var SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
    var MediaStream = window.webkitMediaStream || window.MediaStream;
    var screenSharing = window.location.protocol === 'https:' &&
      ((prefix === 'webkit' && version >= 26) ||
        (prefix === 'moz' && version >= 33));
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var AudioDestination = AudioContext && new AudioContext().createMediaStreamSource && new AudioContext().createMediaStreamDestination;
    var videoEl = document.createElement('video');
    var supportVp8 = videoEl && videoEl.canPlayType && videoEl.canPlayType('video/webm; codecs="vp8", vorbis') === 'probably';
    var getUserMedia = navigator.getUserMedia
      || navigator.webkitGetUserMedia
      || navigator.msGetUserMedia
      || navigator.mozGetUserMedia;

    // export support flags and constructors.prototype && PC
    window.rtcSupport = {
      prefix: prefix,
      browserVersion: version,
      support: !!PC && !!getUserMedia
        && !!(MediaStream && MediaStream.prototype.removeTrack)
        && !!(AudioContext && AudioContext.prototype.createMediaStreamSource && AudioDestination),
      // new support style
      supportRTCPeerConnection: !!PC,
      supportVp8: supportVp8,
      supportGetUserMedia: !!getUserMedia,
      supportDataChannel: !!(PC && PC.prototype && PC.prototype.createDataChannel),
      supportWebAudio: !!(AudioContext && AudioContext.prototype.createMediaStreamSource && AudioDestination),
      supportMediaStream: !!(MediaStream && MediaStream.prototype.removeTrack),
      supportScreenSharing: !!screenSharing,
      // constructors
      AudioContext: AudioContext,
      PeerConnection: PC,
      SessionDescription: SessionDescription,
      IceCandidate: IceCandidate,
      MediaStream: MediaStream,
      getUserMedia: getUserMedia,
    };
    window.$storage.setItem('rtcSupport', JSON.stringify(rtcSupport));
  }
})();
