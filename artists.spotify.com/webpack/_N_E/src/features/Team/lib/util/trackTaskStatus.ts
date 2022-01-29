// ignore-string-externalization
import { isCancellablePromise } from './CancellablePromise';
var idCounter = 0;
export var trackTaskStatus = function trackTaskStatus(task, updateTaskStatus, prefix) {
  var id = "[".concat(idCounter++, "]").concat(prefix || 'generic-task');
  updateTaskStatus(id, 'running', {
    promise: task
  });
  (isCancellablePromise(task) ? task.promise : task).then(function () {
    return updateTaskStatus(id, 'complete');
  }, function (error) {
    return updateTaskStatus(id, 'error', {
      error: error
    });
  });
  return id;
};