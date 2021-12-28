/**
 Utility functions
 */
const Utils = (function Utils() {
  /**
   Checks if all objects provided exists.
   @return {boolean} true If all object exists, otherwise false
   */
  const exists = (...objects) => {
    for (const object of objects) {
      if (object === undefined || object === null || object.length === 0) {
        return false;
      }
    }
    return true;
  };


  const GROUP_NOT_RUN = 'NOT_RUN';
  const GROUP_FAILED = 'FAILED';
  const GROUP_PASSED = 'PASSED';
  const GROUP_IN_PROGRESS = 'IN_PROGRESS';

  /**
   * Iterate through all groups to create a group test status
   *
   * NOT_RUN = The test group have not run a single test.
   * PASSED = Passed all tests.
   * FAILED = One or more tests failed.
   * IN_PROGRESS = Have started running tests, but not all.
   * @param {bool} stopRunning If true, we've stopped running tests and need to purge tests
   * still in 'RUNNING' state.
   */
  const updateTestsStatus = (tests, testStatuses, stopRunning) => {
    if (!exists(tests, testStatuses)) {
      return tests;
    }
    const groups = tests.groups;
    groups.map(group => {
      let groupStatus = GROUP_NOT_RUN;

      if (group.tests !== undefined) {
        let numberOfFailures = 0;
        let numberOfPasses = 0;
        let numberOfSkips = 0;
        let numberOfFlaky = 0;
        let numberOfRunning = 0;
        const total = group.tests.length;
        group.tests.forEach(test => {
          const testStatus = testStatuses[test.id];
          if (testStatus !== undefined) {
            if (testStatus.testResult.status === 'FAIL' || testStatus.testResult.status === 'ERROR') {
              numberOfFailures++;
            }
            if (testStatus.testResult.status === 'PASS') {
              numberOfPasses++;
            }
            if (testStatus.testResult.status === 'SKIP') {
              numberOfSkips++;
            }
            if (testStatus.testResult.status === 'FLAKY') {
              numberOfFlaky++;
            }
            if (testStatus.testResult.status === 'RUNNING' || testStatus.testResult.status === 'PROMPT') {
              numberOfRunning++;
              if (stopRunning === true) {
                testStatus.testResult.status = null;
              }
            }
          }
        });
        const progress = numberOfPasses + numberOfSkips + numberOfFlaky;
        if (progress === group.tests.length) {
          groupStatus = GROUP_PASSED;
        } else if (numberOfFailures > 0) {
          groupStatus = GROUP_FAILED;
        } else if ((numberOfRunning + numberOfFlaky + numberOfSkips + numberOfPasses) > 0) {
          groupStatus = GROUP_IN_PROGRESS;
        }
        group.nrOfTests = total;
        group.progress = progress;
      } else {
        groupStatus = GROUP_PASSED;
      }
      group.testStatus = groupStatus;
    });
    return groups;
  };

  /**
   Validates if the certification is finished or not.
   @return {boolean} true If the certification has passed all tests, otherwise false.
   */
  const finishedCertification = (tests) => {
    if (!exists(tests)) {
      return false;
    }
    return tests.length > 0 && tests.filter(group => {
      return group.testStatus === GROUP_PASSED;
    }).length === tests.length;
  };

  /**
   * Returns a timestamp formatted as mm:ss
   */
  const formattedSongTime = (time) => {
    if (!time) {
      return '';
    }
    const formatter = new Intl.DateTimeFormat(
      'en-US', {
        minute: '2-digit',
        second: '2-digit',
      },
    );
    return formatter.format(time);
  };

  /**
   * Returns the provided timestamp, formatted to MM-DD, YYYY
   */
  const formattedTimeStamp = (timestamp) => {
    const formatter = new Intl.DateTimeFormat(
      'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    );
    return formatter.format(new Date(timestamp));
  };

  /**
   * Returns true if the UI should be in printer mode, otherwise false.
   */
  const printerMode = () => {
    return window.location.search === '?print';
  };

  return {
    exists: exists,
    updateTestsStatus: updateTestsStatus,
    finishedCertification: finishedCertification,
    formattedTimeStamp: formattedTimeStamp,
    formattedSongTime: formattedSongTime,
    printerMode: printerMode,
  };
})();

export default Utils;
