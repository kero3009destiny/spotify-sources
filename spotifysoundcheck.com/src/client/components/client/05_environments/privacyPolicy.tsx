import React from "react";
import styled from "styled-components";
import AdminBar from "../03_organisms/adminBar";

const StyledPrivacyPolicy = styled.div`
  margin: 80px auto;
  padding: 0 1em;
  max-width: 1024px;
  font-weight: normal;

  p,
  li {
    font-size: unset;
    font-weight: unset;
  }

  p {
    margin-top: 1em;
  }

  table {
    border-collapse: collapse;
    th,
    td {
      border: 1px solid var(--color-DARKNESS);
      padding: 0.5em;
      vertical-align: top;
      p {
        margin-top: unset;
      }
    }
  }
`;

const StyledTopHeadline = styled.h1``;

const StyledSectionList = styled.ol`
  list-style-position: inside;

  h2 {
    display: inline-block;
    margin-top: 1em;
  }

  ul,
  ol {
    list-style-position: outside;
    margin-left: 1.5em;
  }

  ul {
    list-style-type: disc;
  }
`;

const StyledTableHead = styled.thead`
  text-align: center;
  background-color: #548dd4;
`;

const StyledTableCaption = styled.p`
  font-weight: bold !important;
  font-style: italic;
`;

const StyledPersonalDataTitle = styled.span`
  font-weight: bold;
  text-decoration: underline;
`;

const PrivacyPolicy = () => {
  return (
    <>
      <AdminBar />

      <StyledPrivacyPolicy>
        <StyledTopHeadline>
          Spotify For Brands - Privacy Policy
        </StyledTopHeadline>

        <StyledSectionList>
          <li>
            <h2>Introduction</h2>
            <p>Thanks for being a business partner of Spotify!</p>
            <p>
              At Spotify, we want to give you the best possible experience to
              ensure that you enjoy working with us today, tomorrow and in the
              future. Privacy and security of personal data is, and will always
              be, enormously important to us. So, we want to transparently
              explain how and why we gather, store, share and use your personal
              data - as well as outline the controls and choices you have around
              when and how you share your personal data.
            </p>
            <p>
              That is our objective, and this Privacy Policy (“Policy”) will
              explain exactly what we mean in further detail below.
            </p>
          </li>
          <li>
            <h2>About this Policy</h2>
            <p>
              This Policy sets out the essential details about the processing of
              your personal data relating to your company’s business
              relationship with Spotify, (“Spotify”, “we”, “our”, “us”). This
              Policy also covers the processing of personal data within our
              Spotify For Brands educational portal (“
              <strong>Spotify Soundcheck</strong>”).
            </p>

            <p>
              For information about how we process your personal data relating
              to your private Spotify Service account, please be referred to our{" "}
              <a href="https://www.spotify.com/us/legal/privacy-policy/">
                User Privacy Policy
              </a>
              .
            </p>

            <p>
              We hope this helps you to understand our privacy commitment to
              you. For information on how to contact us if you ever have any
              questions or concerns, then please see Section 12 “How to Contact
              Us”.
            </p>
          </li>

          <li>
            <h2>
              Your rights and your preferences: Giving you choice and control
            </h2>
            <p>
              You may be aware that the (EU) General Data Protection Regulation
              or "GDPR" gives certain rights to individuals in relation to their
              personal data. As available and except as limited under applicable
              law, the rights afforded to individuals are:
            </p>
            <ul>
              <li>
                <em>Right of Access</em> - the right to be informed of and
                request access to the personal data we process about you;
              </li>
              <li>
                <em>Right to Rectification</em> - the right to request that we
                amend or update your personal data where it is inaccurate or
                incomplete;
              </li>
              <li>
                <em>Right to Erasure</em> - the right to request that we delete
                your personal data;
              </li>
              <li>
                <em>Right to Restrict</em> - the right to request that we
                temporarily or permanently stop processing all or some of your
                personal data;
              </li>
              <li>
                <em>Right to Object</em> -
                <ul>
                  <li>
                    the right, at any time, to object to us processing your
                    personal data on grounds relating to your particular
                    situation;
                  </li>
                  <li>
                    the right to object to your personal data being processed
                    for direct marketing purposes;
                  </li>
                </ul>
              </li>
              <li>
                <em>Right to Data Portability</em> - the right to request a copy
                of your personal data in electronic format and the right to
                transmit that personal data for use in another party’s service;
                and
              </li>
              <li>
                <em>Right not to be subject to Automated Decision-making</em> -
                the right to not be subject to a decision based solely on
                automated decision-making, including profiling, where the
                decision would have a legal effect on you or produce a similarly
                significant effect.
              </li>
            </ul>
            <p>
              If we send you electronic marketing messages based on your consent
              or otherwise permitted by applicable law, you may, at any time,
              withdraw such consent or declare your objection (“opt-out”) at no
              cost. The electronic marketing messages you receive from Spotify
              (e.g. those sent via email) will also include an opt-out mechanism
              within the message itself (e.g. an unsubscribe link in the emails
              we send to you).
            </p>
            <p>
              If you have any questions about your privacy, your rights, or how
              to exercise them, please contact{" "}
              <a href="mailto:privacy@spotify.com">privacy@spotify.com</a>. We
              will respond to your request within a reasonable period of time
              upon verification of your identity. If you are unhappy with the
              way we are using your personal data you can also contact, and are
              free to lodge a complaint with, the Swedish Data Protection
              Authority (Datainspektionen) or your local Data Protection
              Authority.
            </p>
          </li>
          <li>
            <h2>How do we collect your personal data?</h2>
            <p>We collect your personal data in the following ways:</p>
            <ol>
              <li>
                <StyledPersonalDataTitle>
                  Personal data provided by you
                </StyledPersonalDataTitle>{" "}
                – We may collect personal data from our business partners and
                their representatives at events, when you sign-up for a
                newsletter and through our business contacts with you. If you
                create an account for Spotify Soundcheck, we ask for certain
                additional personal data about you in order to set up the
                account.
              </li>

              <li>
                <StyledPersonalDataTitle>
                  Personal data provided by your employer or by publicly
                  available sources
                </StyledPersonalDataTitle>{" "}
                – We may collect personal data from your employer and/or
                colleagues in our business contacts with them or by publicly
                available sources such as your LinkedIn profile.
              </li>

              <li>
                <StyledPersonalDataTitle>
                  Personal data provided through our business contacts or your
                  use of Spotify Soundcheck
                </StyledPersonalDataTitle>{" "}
                – We may collect personal data of our business partners and
                their representatives, i.e. you, through our business contacts.
                If you use Spotify Soundcheck, we may also collect personal data
                provided through your use of the portal.
              </li>

              <li>
                <StyledPersonalDataTitle>
                  Personal data collected that enables us to provide you with
                  additional features/functionality
                </StyledPersonalDataTitle>{" "}
                – From time to time, you may also provide us with additional
                personal data or give us permission to collect additional
                personal data, e.g. to provide you with more features,
                additional services or invite you to Spotify events.
              </li>

              <li>
                <StyledPersonalDataTitle>
                  Personal data collected from third parties
                </StyledPersonalDataTitle>{" "}
                – We may receive personal data about you from third parties
                including partners we work with, in order to contact you with
                relevant information. We will use this personal data either
                where you have provided your consent to the third party, or to
                Spotify to that data sharing taking place, or where Spotify has
                a legitimate interest to use the personal data in order to
                provide or market Spotify for Brands.
              </li>
            </ol>

            <p>
              We use anonymised and aggregated information for purposes that
              include testing our IT systems, research, data analytics, creating
              marketing and promotion models, improving Spotify for Brands, and
              developing new features and functionality within Spotify for
              Brands including Spotify Soundcheck.
            </p>
          </li>
          <li>
            <h2>What personal data do we collect from you?</h2>
            <p>
              We have set out in the tables below the categories of personal
              data we collect and use about you.
            </p>

            <StyledTableCaption>
              Personal data provided by you
            </StyledTableCaption>
            <table>
              <StyledTableHead>
                <tr>
                  <th scope="col">Categories of personal data</th>
                  <th scope="col">Description of category</th>
                </tr>
              </StyledTableHead>
              <tbody>
                <tr>
                  <th scope="row">
                    Account registration data for Spotify Soundcheck
                  </th>
                  <td>
                    <p>
                      This is the personal data that is provided by you or
                      collected by us when creating your account for Spotify
                      Soundcheck. This includes your name, employer, holding
                      company, company position, company department, business
                      email address, Spotify service account email address,
                      password, location, state and country.
                    </p>
                    <p>
                      Some of the personal data we will ask you to provide is
                      required in order to create your account. You also have
                      the option to provide us with some additional personal
                      data in order to make your account more personalized, such
                      as uploading a profile image.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <StyledTableCaption>
              Personal data provided by you, your employer or by publicly
              available sources
            </StyledTableCaption>
            <table>
              <StyledTableHead>
                <tr>
                  <th scope="col">Categories of personal data</th>
                  <th scope="col">Description of category</th>
                </tr>
              </StyledTableHead>
              <tbody>
                <tr>
                  <th scope="row">
                    Customer Relationship Management data (“CRM Data”)
                  </th>
                  <td>
                    <p>
                      This is the personal data that is collected about you when
                      you request more information about Spotify for Brands,
                      subscribe to our newsletter, join Spotify events, or
                      otherwise work or integrate with Spotify for Brands. CRM
                      Data could also be collected from your employer and/or
                      colleagues or through publicly available sources, such as
                      LinkedIn. CRM Data includes:
                    </p>

                    <ul>
                      <li>
                        Name, business email address, company name, country,
                        type of business, industry, privacy campaign objective,
                        Spotify for Brands products and services that you find
                        interesting, etc.
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <StyledTableCaption>
              Personal data provided through your use of Spotify Soundcheck
            </StyledTableCaption>
            <table>
              <StyledTableHead>
                <tr>
                  <th scope="col">Categories of personal data</th>
                  <th scope="col">Description of category</th>
                </tr>
              </StyledTableHead>
              <tbody>
                <tr>
                  <th scope="row">Spotify Soundcheck Usage Data</th>
                  <td>
                    <p>
                      This is the personal data that is collected about you when
                      you are using Spotify Soundcheck. This includes:
                    </p>
                    <ul>
                      <li>
                        Information about your interactions with Spotify
                        Soundcheck which includes progress per module, score,
                        i.e. how many questions you got right and completed,
                        lessons (contentful), and other interactions on Spotify
                        Soundcheck.
                      </li>
                      <li>
                        Your interactions with Spotify’s customer support team.
                      </li>
                      <li>
                        Technical Data which may include URL information, cookie
                        data, your IP address, the types of devices you are
                        using to access or connect to Spotify Soundcheck, unique
                        device IDs, device attributes, network connection type
                        and provider, network and device performance, browser
                        type, language, and operating system. Further details
                        about the technical data that is processed by us can be
                        found in our Cookie Policy.
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <StyledTableCaption>
              Personal data collected with your permission that enables us to
              provide you with additional features/functionality
            </StyledTableCaption>
            <table>
              <StyledTableHead>
                <tr>
                  <th scope="col">Categories of personal data</th>
                  <th scope="col">Description of category</th>
                </tr>
              </StyledTableHead>
              <tbody>
                <tr>
                  <th scope="row">Survey and Contest Data</th>
                  <td>
                    If you participate in any survey or contest, you will
                    provide certain personal data as part of your participation,
                    unless you respond anonymously. The exact personal data
                    collected will vary depending on the survey or contest.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Marketing Data</th>
                  <td>
                    <p>
                      This personal data is used to enable Spotify for Brands
                      and our partners / service providers to send you marketing
                      communications either:
                    </p>
                    <ul>
                      <li>Via email; and/or</li>
                      <li>Direct from the third party.</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>

          <li>
            <h2>What do we use your personal data for?</h2>
            <p>
              We use a variety of technologies to process the personal data we
              collect about you for various reasons. We have set out in the
              table below the reasons why we process your personal data, the
              associated legal bases we rely upon to legally permit us to
              process your personal data, and the categories of personal data
              (identified in Section 5 “What personal data do we collect from
              you?”) used for these purposes:
            </p>
            <table>
              <StyledTableHead>
                <tr>
                  <th scope="col">
                    Description of why Spotify processes your personal data
                    (´processing purpose´)
                  </th>
                  <th scope="col">Legal Basis for the processing purpose</th>
                  <th scope="col">
                    Categories of personal data used by Spotify for Brands for
                    the processing purpose
                  </th>
                </tr>
              </StyledTableHead>
              <tbody>
                <tr>
                  <td>
                    To provide, customize, and improve your experience with
                    Spotify Soundcheck and other services provided by Spotify
                    for Brands, for example by providing customized or localized
                    advertising (including for third party products and
                    services).
                  </td>
                  <td>
                    <ul>
                      <li>Legitimate interest</li>
                      <li>Consent</li>
                    </ul>
                  </td>

                  <td>
                    <ul>
                      <li>CRM Data</li>
                      <li>Account Registration Data for Spotify Soundcheck</li>
                      <li>Spotify Soundcheck Usage Data</li>
                      <li>Marketing Data</li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td>
                    To understand how you access and use Spotify Soundcheck to
                    ensure technical functionality of Spotify Soundcheck,
                    develop new products and services, and analyze your use of
                    Spotify Soundcheck, including your interaction with
                    applications, products, and services that are made
                    available, linked to, or offered through Spotify Soundcheck.
                  </td>

                  <td>
                    <ul>
                      <li>Legitimate interest</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>Account Registration Data for Spotify Soundcheck</li>
                      <li>Spotify Soundcheck Usage Data</li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <td>
                    To communicate with you for Spotify for Brands-related
                    purposes.
                  </td>
                  <td>
                    <ul>
                      <li>Legitimate interest</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>CRM Data</li>
                      <li>Account Registration Data for Spotify Soundcheck</li>
                      <li>Spotify Soundcheck Usage Data</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      To communicate with you, either directly or through one of
                      our partners, for:
                    </p>
                    <ul>
                      <li>marketing,</li>
                      <li>research,</li>
                      <li>participation in surveys,</li>
                      <li>promotional purposes, and</li>
                      <li>progress updates in Spotify Soundcheck</li>
                    </ul>
                    via emails, notifications, or other messages, consistent
                    with any permissions you may have communicated to us.
                  </td>
                  <td>
                    <ul>
                      <li>Consent</li>
                      <li>Legitimate interest</li>
                    </ul>
                  </td>
                  <td>
                    <ul>
                      <li>CRM Data</li>
                      <li>Survey and Contest Data</li>
                      <li>Marketing Data</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              If you require further information about the relevant legal basis
              and the balancing test that Spotify has undertaken to justify its
              reliance on the legitimate interest legal basis under the GDPR,
              please see Section 12 “How to Contact Us”.
            </p>
          </li>

          <li>
            <h2>Sharing your personal data</h2>
            <p>
              We have set out the categories of recipients of the personal data
              collected or generated through your use of Spotify for Brands and
              Spotify Soundcheck.
            </p>
            <StyledTableCaption>Personal data we may share</StyledTableCaption>
            <table>
              <StyledTableHead>
                <tr>
                  <th scope="col">Categories of recipients</th>
                  <th scope="col">Reason for sharing</th>
                </tr>
              </StyledTableHead>
              <tbody>
                <tr>
                  <th scope="row">Service Providers</th>
                  <td>
                    We use certain reputable third parties to provide us with
                    certain specialized services related to Spotify Soundcheck,
                    in particular providers which host, store, manage and
                    maintain Spotify Soundcheck, its content and the data we
                    process. These third parties will have access to certain
                    data about you, but only where this is necessary in order
                    for those third parties to provide their services to us.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Marketing Partners</th>
                  <td>
                    <p>
                      We may share personal data with certain marketing and
                      advertising partners to send you marketing communications
                      about Spotify for Brands.
                    </p>

                    <p>
                      Our marketing partners may help us to serve ads or
                      relevant information to you by combining this information
                      with data which they have collected about you elsewhere.
                      They collect this information when you use their services
                      or the websites and services of third parties. This
                      Privacy Policy does not apply to the collection of your
                      information by our marketing partners.
                    </p>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Statistical Analysis Portal</th>
                  <td>
                    We may aggregate your personal data with similar data
                    relating to other users of Spotify Soundcheck in order to
                    create statistical information regarding Spotify Soundcheck
                    and its use, which we may then share with third parties or
                    make publicly available. However, none of this information
                    would include any email address or other contact
                    information, or anything that could be used to identify you
                    individually, either online or in real life.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Other Spotify Group Companies</th>
                  <td>
                    We will share your personal data with other Spotify Group
                    companies to carry out our daily business operations and to
                    enable us to maintain and provide the Spotify for Brands
                    services to you.
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    Law Enforcement and Data Protection Authorities
                  </th>
                  <td>
                    We will disclose your personal data if we believe in good
                    faith that we are permitted or required to do so by law,
                    including in response to a court order, subpoena or other
                    legal demand or request. We may disclose your personal data
                    if we feel this is necessary in order to protect or defend
                    our legitimate rights and interests, or those of our users,
                    employees, directors or shareholders, and/or to ensure the
                    safety and security of Spotify Soundcheck.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Purchasers of our business</th>
                  <td>
                    We may transfer your personal data to any person or company
                    that acquires all or substantially all of the assets or
                    business of Spotify for Brands, or on a merger of our
                    business, or in the event of our insolvency, provided that
                    such person or company be bound by this Policy or terms
                    substantially similar.
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
          <li>
            <h2>Data retention and deletion</h2>
            <p>
              We keep your personal data only as long as necessary to provide
              you with the Spotify for Brands services and for legitimate and
              essential business purposes, such as maintaining the performance
              of Spotify Soundcheck, making data-driven business decisions about
              new features and offerings, complying with our legal obligations,
              and resolving disputes.
            </p>

            <p>
              If you request, we will delete or anonymise your personal data so
              that it no longer identifies you, unless we are legally allowed or
              required to maintain certain personal data, including situations
              such as the following:
            </p>
            <ul>
              <li>
                If there is an unresolved issue relating to you and/or your
                company, such as an outstanding credit on your account or an
                unresolved claim or dispute, we will retain the necessary
                personal data until the issue is resolved;
              </li>
              <li>
                Where we are required to retain the personal data for our legal,
                tax, audit and accounting obligations, we will retain the
                necessary personal data for the period required by applicable
                law; and/or,
              </li>
              <li>
                Where necessary for our legitimate business interests, such as
                fraud prevention or to maintain the security of our users.
              </li>
            </ul>
            <p>
              You can always delete your personal data and your Spotify
              Soundcheck account by contacting us at{" "}
              <a href="mailto:support@spotify.com">support@spotify.com</a> at
              any time.
            </p>
          </li>

          <li>
            <h2>Transfer to other countries</h2>
            <p>
              Spotify may subcontract processing to, or share your personal data
              with third parties located in countries other than your home
              country. Your personal data may therefore be subjected to privacy
              laws that are different from those in your country of residence.
            </p>

            <p>
              Personal data collected within the European Union and Switzerland
              may, for example, be transferred to and processed by third parties
              located in a country outside of the European Union and
              Switzerland. In such instances Spotify shall ensure that the
              transfer of your personal data is carried out in accordance with
              applicable privacy laws and in particular that appropriate
              contractual, technical, and organisational measures are in place,
              such as the Standard Contractual Clauses approved by the EU
              Commission.
            </p>
          </li>

          <li>
            <h2>Keeping your personal data safe</h2>

            <p>
              We are committed to protecting our data subjects’ personal data.
              We implement appropriate technical and organisational measures to
              help protect the security of your personal data; however, please
              note that no system is ever completely secure.
            </p>

            <p>
              Your password protects your Spotify Soundcheck account, so we
              encourage you to use a unique and strong password, limit access to
              your computer and browser, and log out after having used Spotify
              Soundcheck.
            </p>
          </li>

          <li>
            <h2>Changes to this Privacy Policy</h2>

            <p>We may occasionally make changes to this Policy.</p>

            <p>
              When we make material changes to this Policy, we’ll provide you
              with prominent notice as appropriate under the circumstances,
              e.g., by displaying a notice on the Spotify for Brands website or
              by sending you an email. We may notify you in advance. Please
              therefore make sure you read any such notice carefully.
            </p>
          </li>

          <li>
            <h2>How to contact us</h2>

            <p>
              Thank you for reading our Privacy Policy. If you have questions
              about this Policy, please contact{" "}
              <a href="mailto:privacy@spotify.com">privacy@spotify.com</a> or by
              writing to us at the address indicated below.
            </p>

            <p>
              Spotify USA Inc. is the data controller for the purposes of the
              personal data processed under this Policy if you are based in the
              US.
            </p>

            <p>
              <strong>
                Spotify USA Inc.
                <br />
                4 World Trade Center, 150 Greenwich Street, 62nd Floor, New
                York, NY 10007
                <br />
                USA
              </strong>
            </p>

            <p>
              Spotify AB is the data controller for the purposes of the personal
              data processed under this Policy if you are based in any other
              country.
            </p>

            <p>
              <strong>
                Spotify AB
                <br />
                Regeringsgatan 19, SE-111 53 Stockholm
                <br />
                Sweden
              </strong>
            </p>
          </li>
        </StyledSectionList>

        <p>
          We hope you enjoy Spotify for Brands!
          <br />© Spotify.
        </p>
      </StyledPrivacyPolicy>
    </>
  );
};

export default PrivacyPolicy;
