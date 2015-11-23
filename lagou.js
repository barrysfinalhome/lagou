/* global Promise */
/* global BMap */
(function () {
  var getJobDetailUrlByPosition = function (positionId) {
    return 'http://www.lagou.com/jobs/' + positionId + '.html';
  }

  var getJobAddress = function (url) {
    return new Promise(function (resolve, reject) {
      $.get(url).done(function (data) {
        var jobAddress = data.match(/<h4>工作地址<\/h4>\s*<div>(.*)<\/div>/m)[1];
        resolve(jobAddress);
      }).fail(function (err) {
        reject(err);
      });
    });
  };

  var showJobAddress = function () {
    $('div#s_position_list > ul > li').each(function (i, item) {
      var positionId = item.getAttribute('data-positionid');
      getJobAddress(getJobDetailUrlByPosition(positionId)).then(function (jobAddress) {
        $(item).append(jobAddress);
      });
    });
  };

  if (typeof (BMap) === "undefined") {
    $.getScript('http://api.map.baidu.com/getscript?v=1.5&ak=ocE8PypfSfINnlhTCRCR4Nzx');
  }
  new MutationObserver(
    function () {
      showJobAddress()
    }).observe($('div#s_position_list > ul')[0], { 'childList': true })
})();