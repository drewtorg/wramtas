app.controller('affiliateController', function ($scope) {
	$scope.message = 'Affiliates!';

	$scope.affiliates = [
		{
			text : 'American Music Therapy Association Students',
			link : 'http://www.amtas.org/'
		},
		{
			text : 'American Music Therapy Association',
			link : 'http://www.musictherapy.org/'
		},
		{
			text : 'The Western Region Chapter of the American Music Therapy Association',
			link : 'http://www.wramta.org/'
		},
	];

	$scope.universities = [
		{
			text : 'Arizona State University',
			link : 'http://www.asu.edu/'
		},
		{
			text : 'California State University Northridge',
			link : 'http://www.csun.edu/'
		},
		{
			text : 'University of the Pacific',
			link : 'http://www.pacific.edu/'
		},
		{
			text : 'Marylhurst University',
			link : 'http://www.marylhurst.edu/'
		},
		{
			text : 'Seattle Pacific University',
			link : 'http://spu.edu/'
		},
		{
			text : 'Utah State University',
			link : 'http://www.usu.edu/'
		},
		{
			text : 'Pacific University Oregon',
			link : 'http://www.pacificu.edu/'
		},
	];

	$scope.otherResources = [
		{
			text : 'The Certification Board for Music Therapists',
			link : 'http://www.cbmt.org/'
		},
		{
			text : 'World Federation of Music Therapy for Students',
			link : 'http://wfmt.info/WFMT/WFMT_for_Students.html'
		},
		{
			text : 'World Federation of Music Therapy',
			link : 'http://www.wfmt.info/'
		},
		{
			text : 'Voices: A World Forum for Music Therapy',
			link : 'https://voices.no/index.php/voices'
		},
	];
});
