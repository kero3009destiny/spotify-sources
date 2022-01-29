// ignore-string-externalization
export var SortOrder;

(function (SortOrder) {
  SortOrder["ASC"] = "asc";
  SortOrder["DESC"] = "desc";
})(SortOrder || (SortOrder = {}));

export var generateHeaders = function generateHeaders(layoutType, t) {
  var columns = ['name', 'admin', 'type', 'accessLevel'];
  var fullLayoutColWidth = 30;
  var isFullLayout = layoutType === 'full';
  var colgroup = [{
    key: columns[0],
    colWidth: isFullLayout ? "".concat(fullLayoutColWidth + 30, "%") : '70%'
  }, isFullLayout && {
    key: columns[1],
    colWidth: '20%'
  }, isFullLayout && {
    key: columns[2],
    colWidth: '20%'
  }, {
    key: columns[3],
    colWidth: isFullLayout ? '20%' : '30%'
  }].filter(function (d) {
    return d;
  });
  var headers = [{
    title: t('TEAM_ROSTER_PAGE_TEAM_NAME_HEADER', 'team name', 'Header for Team Name column'),
    key: columns[0],
    isSortable: true,
    align: 'left',
    truncate: !isFullLayout
  }, isFullLayout && {
    title: t('TEAM_ROSTER_PAGE_ADMIN_HEADER', 'admin', 'Header for Admin column'),
    key: columns[1],
    isSortable: false,
    align: 'left'
  }, isFullLayout && {
    title: t('TEAM_ROSTER_PAGE_TEAM_TYPE_HEADER', 'team type', 'Header for Team Type column'),
    key: columns[2],
    isSortable: true,
    align: 'left'
  }, {
    title: t('TEAM_ROSTER_PAGE_ACCESS_LEVEL_HEADER', 'access level', 'Header for Access Level column'),
    key: columns[3],
    isSortable: false,
    align: 'left'
  }].filter(function (d) {
    return d;
  });
  return {
    headers: headers,
    colgroup: colgroup
  };
};
export var sort = function sort(data, sortKey, sortOrder) {
  if (!sortKey) return data;
  return data.slice().sort(function (a, b) {
    var aVal = a[sortKey] != null ? a[sortKey] : 0;
    var bVal = b[sortKey] != null ? b[sortKey] : 0;
    var elementA = typeof aVal === 'string' ? aVal.toLowerCase() : aVal;
    var elementB = typeof bVal === 'string' ? bVal.toLowerCase() : bVal;

    if (elementA && elementB && elementA !== elementB) {
      if (sortOrder === SortOrder.DESC) {
        return elementA < elementB ? 1 : -1;
      }

      return elementA < elementB ? -1 : 1;
    }

    return 0;
  });
};