/* eslint max-len: "off", camelcase: "off" */

app.constant('TINY_MCE_OPTIONS', {
  selector: 'textarea',
    theme: 'modern',
    plugins: [
      'advlist autolink link image imagetools lists charmap preview hr anchor pagebreak spellchecker',
      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
      'save table contextmenu directionality template paste textcolor upload'
    ],
    height: 400,
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link upload fullpage | forecolor',
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    style_formats_merge: true,
    style_formats: [{
      title: 'Images',
      items: [{
        title: 'Float Left',
        selector: 'img',
        styles: {
          'float': 'left',
          'margin': '0 10px 0 10px'
        }
      }, {
        title: 'Float Right',
        selector: 'img',
        styles: {
          'float': 'right',
          'margin': '0 10px 0 10px'
        }
      }, {
        title: 'Shadow Box',
        selector: 'img',
        styles: {
          'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
        }
      }]
    }]
});

app.constant('DATE_OPTIONS', {
  format: 'MM/dd/yy h:mm a',
  datepickerOptions: {
    maxDate: new Date(2025, 5, 22),
    minDate: new Date(),
    startingDay: 1
  }
});

app.constant('TABS', [{
    href: '/about',
    title: 'About'
  }, {
    href: '/affiliates',
    title: 'Affiliates'
  }, {
    href: '/conference',
    title: 'Conferences',
    subtabs: [{
      href: '/conference',
      title: 'Regional and National Info'
    }, {
      href: '/scholarships',
      title: 'Conference Scholarships'
    }, {
      href: '/presentations',
      title: 'Presentation Proposals'
    }]
  }, {
    href: '/grant',
    title: 'Service Grant'
  }, {
    href: '/elections',
    title: 'Elections',
    subtabs: [{
      href: '/election-info',
      title: 'General Election Information'
    }, {
      href: '/nominate',
      title: 'Nominate WRAMTAS Members'
    }, {
      href: '/candidates',
      title: 'View Candidates'
    }, {
      href: '/vote',
      title: 'Vote for WRAMTAS Board'
    }]
  }, {
    href: '/spotlight',
    title: 'Spotlight'
  }, {
    href: '/master-class',
    title: 'Master Class'
  }]
);