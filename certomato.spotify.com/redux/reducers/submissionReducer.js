import {
  CHECKBOX_CHANGE,
  GET_SUBMISSION_FIELDS,
  TEXTFIELD_DID_CHANGE,
  TEXTFIELD_FIRSTNAME,
  TEXTFIELD_LASTNAME,
  TEXTFIELD_EMAIL,
  TEXTFIELD_COMPANY,
  TEXTFIELD_FWVERSION,
} from '../actions/types';

const CHECKBOX_RAN_ALL_TESTS = 'CHECKBOX_RAN_ALL_TESTS';
const CHECKBOX_DONE_EXPLORATORY_TESTING = 'CHECKBOX_DONE_EXPLORATORY_TESTING';
const CHECKBOX_LATENCY = 'CHECKBOX_LATENCY';
const CHECKBOX_UX_REQUIREMENTS = 'CHECKBOX_UX_REQUIREMENTS';
const CHECKBOX_CORRECT_INFORMATION = 'CHECKBOX_CORRECT_INFORMATION';

const initialState = {
  submission: {
    readyToSubmit: false,
    textfields: {
      [TEXTFIELD_FIRSTNAME]: {
        text: '',
        description: 'First name',
      },
      [TEXTFIELD_LASTNAME]: {
        text: '',
        description: 'Family name',
      },
      [TEXTFIELD_EMAIL]: {
        text: '',
        description: 'Email',
      },
      [TEXTFIELD_COMPANY]: {
        text: '',
        description: 'Company name',
      },
      [TEXTFIELD_FWVERSION]: {
        text: '',
        description: 'Firmware version',
      },
    },
    checkboxes:
      {
        [CHECKBOX_DONE_EXPLORATORY_TESTING]: {
          checked: false,
          description: 'I have ran all tests in Certomato as described, without any attempts to' +
            ' alter the results by interfering with the tests.',
        },
        [CHECKBOX_RAN_ALL_TESTS]: {
          checked: false,
          description: 'I have done proper exploratory testing on the device, going deeper and broader than just the tests in Certomato.',
        },
        [CHECKBOX_LATENCY]: {
          checked: false,
          description: 'I assure that the latency meet Spotify\'s Product Requirements. Latency' +
            ' from action to audio response should not exceed 500ms (1000ms for multi-room),' +
            ' excluding network latency.',
        },
        [CHECKBOX_UX_REQUIREMENTS]: {
          checked: false,
          description: 'I assure that the incorporation of Spotify technology into the device, or the appearance of the Spotify service and Spotify brand in the companion app follows Spotify\'s user experience requirements.',
        },
        [CHECKBOX_CORRECT_INFORMATION]: {
          checked: false,
          description: 'I assure that the request for Certification contains the correct information, files or other instructions.',
        },
      },
  },
};

const readyToSubmit = (submission) => {
  let ready = true;

  // Validate all checkboxes are ticked
  Object.keys(submission.checkboxes).map(key => {
    const checkbox = submission.checkboxes[key];
    if (checkbox.checked === false) {
      ready = false;
    }
  });

  // Validate all text fields
  Object.keys(submission.textfields).map(key => {
    const textfield = submission.textfields[key];
    if (textfield.text.length < 2) {
      ready = false;
    }
  });

  return ready;
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECKBOX_CHANGE: {
      const checkboxes = {...state.submission.checkboxes};
      checkboxes[action.payload].checked = !checkboxes[action.payload].checked;
      return {
        submission: {
          readyToSubmit: readyToSubmit(state.submission),
          textfields: state.submission.textfields,
          checkboxes,
        },
      };
    }
    case TEXTFIELD_DID_CHANGE: {
      const textfields = {...state.submission.textfields};
      textfields[action.id].text = action.value;
      return {
        submission: {
          readyToSubmit: readyToSubmit(state.submission),
          textfields: state.submission.textfields,
          checkboxes: state.submission.checkboxes,
        },
      };
    }
    case GET_SUBMISSION_FIELDS: {
      return {submission: state.submission};
    }
    default:
      return state;
  }
}
