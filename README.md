<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Plaid Accounts Balance HTML reports</h3>
  <p align="center">
    Use your accounts linked with Plaid to generate balance HTML reports
    <br/>
    <br/>
    <a href="https://github.com/gonzalofh/plaid-html-reports/wiki"><strong>Wiki docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/gonzalofh/plaid-html-reports/issues">Report Bug</a>
    ·
    <a href="https://github.com/gonzalofh/plaid-html-reports/issues">Request Feature</a>
  </p>
</p>

<br />

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The goal is that developers with Plaid accounts will eventually be able to generate they're own static html reports with data fetched from Plaid's API.

For now, only one default html report gets generated. It displays available and current balances for every account you have linked with Plaid.

### Built With
<br/>

* [Gulp](https://gulpjs.com)
* [Handlebars](https://handlebarsjs.com)

<br/>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

<br/>

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

* gulp
  ```sh
  npm install gulp-cli -g
  ```

* Get your Plaid credentials (if you don't already have them)
  - Go to https://plaid.com/docs/quickstart
  - Follow the instructions to open an account and link your accounts.
  - Save your Plaid client id and secret key
  - Save the access tokens for each institution you link with Plaid. 
  **`WARNING`**: remember to NEVER commit these credentials !!! 

<br/>

### Installation

<br/>

1. Clone the repo
   ```sh
   git clone https://github.com/gonzalofh/plaid-html-reports.git
   ```
    <br/>
2. Install NPM packages
   ```sh
   npm install
   ```
    <br/>
3. Create a json file and name it `plaid-credentials.js` (this file is already within the .gitignore)

    <br/>
4. Follow the example to fill the values:
   ```JSON
    {
        "host": "https://development.plaid.com",
        "clientId": "{{ Plaid client id }}",
        "secretKey": "{{ Plaid secret key }}",
        "institutions": [
            {
                "name": "{{ institution 1 name }}",
                "accessToken": "{{ institution 1 access token }}"
            },
            {
                "name": "{{ institution 2 name }}", 
                "accessToken": "{{ institution 2 access token }}"
            }
        ]
    }
   ```
    <br/>

<!-- USAGE EXAMPLES -->
## Usage

* Execute main task using Gulp
   ```sh
   gulp
   ```

* Open generated report html file at build/html/report.html file 
   ```sh
   open build/html/report.html
   ```

_To see other tasks you can use, please refer to the [Available Tasks](https://github.com/gonzalofh/plaid-html-reports/wiki/Available-tasks) Wiki page_

<br/>

<!-- ROADMAP -->
## Roadmap

In its current state, this modules orchestrates 3 phases:

- Fetching data from Plaid's API and storing it as json files.
- Transforming data received from Plaid.
- Generate a HTML report from transformed data.

Ideally, in the future, these 3 stages should be extracted into external packages and each on eshould be able to use different custom implementations for their jobs.

Specifically, we should be able to: 
- Provide custom html templates
- Use a different template rendering implementation instead of Handlebars
- Provide custom transformation/mapping/filters for Plaid's data

See the [open issues](https://github.com/gonzalofh/plaid-html-reports/issues) for a list of proposed features (and known issues).

<br/>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br/>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<br/>

<!-- CONTACT -->
## Contact

Gonzalo Fernandez - gonzalo.gfh@gmail.com

Project Link: [https://github.com/gonzalofh/plaid-html-reports](https://github.com/gonzalofh/plaid-html-reports)

<br/>

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/gonzalofh/plaid-html-reports.svg?style=for-the-badge
[contributors-url]: https://github.com/gonzalofh/plaid-html-reports/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gonzalofh/plaid-html-reports?style=for-the-badge
[forks-url]: https://github.com/gonzalofh/plaid-html-reports/network/members
[stars-shield]: https://img.shields.io/github/stars/gonzalofh/plaid-html-reports?style=for-the-badge
[stars-url]: https://github.com/gonzalofh/plaid-html-reports/stargazers
[issues-shield]: https://img.shields.io/github/issues/gonzalofh/plaid-html-reports?style=for-the-badge
[issues-url]: https://github.com/gonzalofh/plaid-html-reports/issues
[license-shield]: https://img.shields.io/github/license/gonzalofh/plaid-html-reports.svg?style=for-the-badge
[license-url]: https://github.com/gonzalofh/plaid-html-reports/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/gonzalofh
[product-screenshot]: images/screenshot.png