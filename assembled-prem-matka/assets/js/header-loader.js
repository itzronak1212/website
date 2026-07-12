(function () {
  var headerHost = document.getElementById('site-header');
  if (!headerHost) return;

  function ensureStylesheet(href, attributeName) {
    if (document.querySelector('link[' + attributeName + ']')) return;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute(attributeName, 'true');
    document.head.appendChild(link);
  }

  function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function createSequenceMap() {
    var groups = [
      {
        label: 'Jodi Charts',
        hub: 'all-satta-matka-chart.html',
        pages: [
          'radha-morning-jodi.html',
          'lata-morning-jodi.html',
          'sridevi-jodi.html',
          'time-bazar-jodi.html',
          'madhur-day-jodi.html',
          'milan-day-jodi.html',
          'rajdhani-day-jodi.html',
          'lata-day-jodi.html',
          'radha-day-jodi.html',
          'kalyan-jodi.html',
          'lata-night-jodi.html',
          'sridevi-night-jodi.html',
          'madhur-night-jodi.html',
          'milan-night-jodi.html',
          'rajdhani-night-jodi.html',
          'kalyan-night-jodi.html',
          'main-bazar-jodi.html',
          'radha-night-jodi.html'
        ]
      },
      {
        label: 'Pana Charts',
        hub: 'all-satta-matka-chart.html',
        pages: [
          'radha-morning-pana.html',
          'lata-morning-pana.html',
          'sridevi-pana.html',
          'time-bazar-pana.html',
          'madhur-day-pana.html',
          'milan-day-pana.html',
          'rajdhani-day-pana.html',
          'lata-day-pana.html',
          'radha-day-pana.html',
          'kalyan-pana.html',
          'lata-night-pana.html',
          'sridevi-night-pana.html',
          'madhur-night-pana.html',
          'milan-night-pana.html',
          'rajdhani-night-pana.html',
          'kalyan-night-pana.html',
          'main-bazar-pana.html',
          'radha-night-pana.html'
        ]
      },
      {
        label: 'King Starline Charts',
        hub: 'all-starline-pana.html',
        pages: [
          'all-starline-pana.html',
          '10-30-am-starline-pana.html',
          '11-30-am-starline-pana.html',
          '12-30-pm-starline-pana.html',
          '01-30-pm-starline-pana.html',
          '02-30-pm-starline-pana.html',
          '03-30-pm-starline-pana.html',
          '04-30-pm-starline-pana.html',
          '05-30-pm-starline-pana.html',
          '06-30-pm-starline-pana.html',
          '07-30-pm-starline-pana.html',
          '08-30-pm-starline-pana.html',
          '09-30-pm-starline-pana.html'
        ]
      },
      {
        label: 'King Jackpot Charts',
        hub: 'all-jackpot-jodi.html',
        pages: [
          'all-jackpot-jodi.html',
          '10-00-am-jackpot-jodi.html',
          '11-00-am-jackpot-jodi.html',
          '12-00-pm-jackpot-jodi.html',
          '01-00-pm-jackpot-jodi.html',
          '02-00-pm-jackpot-jodi.html',
          '03-00-pm-jackpot-jodi.html',
          '04-00-pm-jackpot-jodi.html',
          '05-00-pm-jackpot-jodi.html',
          '06-00-pm-jackpot-jodi.html',
          '07-00-pm-jackpot-jodi.html',
          '08-00-pm-jackpot-jodi.html',
          '09-00-pm-jackpot-jodi.html'
        ]
      }
    ];

    var map = {};

    groups.forEach(function (group) {
      group.pages.forEach(function (page, index) {
        map[page] = {
          label: group.label,
          hub: group.hub,
          index: index,
          total: group.pages.length,
          prev: index > 0 ? group.pages[index - 1] : null,
          next: index < group.pages.length - 1 ? group.pages[index + 1] : null
        };
      });
    });

    return map;
  }

  function createSequenceNavigation() {
    var currentPage = getCurrentPage();
    var sequenceMap = createSequenceMap();
    var sequence = sequenceMap[currentPage];

    if (!sequence || document.querySelector('[data-sequence-nav]')) return;

    var wrapper = document.createElement('nav');
    wrapper.className = 'sequence-nav';
    wrapper.setAttribute('data-sequence-nav', 'true');
    wrapper.setAttribute('aria-label', 'Page sequence navigation');

    var title = document.createElement('div');
    title.className = 'sequence-nav__meta';
    title.textContent = sequence.label + ' ' + (sequence.index + 1) + ' of ' + sequence.total;
    wrapper.appendChild(title);

    var actions = document.createElement('div');
    actions.className = 'sequence-nav__actions';

    function createLink(label, href, kind, disabled) {
      var element = document.createElement(disabled ? 'span' : 'a');
      element.className = 'sequence-nav__link sequence-nav__link--' + kind + (disabled ? ' is-disabled' : '');
      element.textContent = label;

      if (!disabled) {
        element.href = href;
      }

      return element;
    }

    actions.appendChild(createLink('Previous', sequence.prev, 'secondary', !sequence.prev));
    actions.appendChild(createLink('View All', sequence.hub, 'primary', false));
    actions.appendChild(createLink('Next', sequence.next, 'secondary', !sequence.next));

    wrapper.appendChild(actions);
    headerHost.insertAdjacentElement('afterend', wrapper);
  }

  ensureStylesheet('./assets/css/header.css', 'data-shared-header-css');
  ensureStylesheet('./assets/css/site-navigation.css', 'data-sequence-nav-css');

  fetch('./assets/includes/header.html', { cache: 'no-store' })
    .then(function (response) {
      if (!response.ok) throw new Error('Header request failed');
      return response.text();
    })
    .then(function (html) {
      headerHost.innerHTML = html;

      var currentPage = getCurrentPage();
      var navLinks = headerHost.querySelectorAll('.nav-link[href], .dropdown-menu a[href], .navbar-brand[href]');

      navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href) return;

        if (href === currentPage) {
          var navItem = link.closest('.nav-item');
          if (navItem) navItem.classList.add('active');
        }
      });

      if (currentPage === 'index.html') {
        var homeLink = headerHost.querySelector('.nav-link[href="index.html"]');
        if (homeLink && homeLink.parentElement) homeLink.parentElement.classList.add('active');
      }

      createSequenceNavigation();
    })
    .catch(function (error) {
      console.error('Shared header load failed:', error);
    });
})();
