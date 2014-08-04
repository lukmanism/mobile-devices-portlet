var policy_ios = [
	{title: 'General', name: 'general', desc: '', type: 'form', value: [
		{title: 'Profile Name', name: 'Profile Name', desc: 'Display name of the profile (shown on the device)', type: 'text'},
		{title: 'Identifier', name: 'identifier', desc: 'Unique identifier for the profile (e.g. com.company.profile)', type: 'text'},
		{title: 'Organization', name: 'organization', desc: 'Name of the organization for the profile', type: 'text'},
		{title: 'Description', name: 'description', desc: 'Brief explanation of the contents or purpose of the profile', type: 'textarea'},
		{title: 'Consent Message', name: 'consent_message', desc: 'Brief message that will displayed during profile installation', type: 'textarea'},
		{title: 'Security', name: 'security', desc: 'Display name of the profile (shown on the device)', type: 'select', value: {
			0: 'Always',
			1: 'With Authentication',
			2: 'Never'
		}},
		{title: 'Remove Pofile', name: 'Automatically Remove Profile', desc: 'Controls when the profile will be automatically removed', type: 'select', value: {
			0: 'Never',
			1: 'On date',
			2: 'After interval'
		}}
	]},
	{title: 'Passcode', name: 'passcode', desc: '', type: 'form', value: [
		{title: 'Allow Simple Value', name: 'Allow Simple Value', desc: 'Permit the use of reporting, ascending, and descending character sequence', type: 'checkbox', value: [0,1]},
		{title: 'Require Alphanumeric Value', name: 'require_alphanumeric_value', desc: 'Require passcodes to contain at least one letter', type: 'checkbox', value: [0,1]},
		{title: 'Minimum Password Length', name: 'minimum_password_length', desc: 'Minimum number of passcode characters allowed', type: 'select', value: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]},
		{title: 'Minimum Complex Character', name: 'minimum_complex_character', desc: 'Minimum number of non-alphanumeric characters allowed', type: 'select', value: [0,1,2,3,4]},
		{title: 'Maximum Passcode Age', name: 'maximum_passcode_age', desc: 'Days (1-730) after which passcode must be changed', type: 'text', value: 0},
		{title: 'Maximum Auto Lock', name: 'maximum_auto_lock', desc: 'Device automatically locks when minutes elapse', type: 'select', value: [0,1,2,3,4,5,12,15]},
		{title: 'Passcode History', name: 'passcode_history', desc: 'The number (1-50) of unique passcodes requires before reuse', type: 'text', value: 0},
		{title: 'Max Grace Period', name: 'max_grace_period', desc: 'Maximum amount of time device can be locked withoutprompting for passcode on unlock', type: 'select', value: {
			0: '--',
			1: 'Immediately',
			2: '1 Minute',
			3: '5 Minutes',
			4: '15 Minutes',
			5: '1 Hour',
			6: '4 Hours'
		}},
		{title: 'Max Failed Attempt', name: 'max_failed_attempt', desc: 'Number of passcode entry attempts allowed before all data device will be erased', type: 'select', value: {
			0: '--',
			1: '4',
			2: '5',
			3: '6',
			4: '7',
			5: '8',
			6: '9',
			7: '10'
		}}
	]},	
	{title: 'Restrictions', name: 'restrictions', 'subtitle': 'Device Functionality', desc: 'Enable use of device features', type: 'form', value: [
		{title: 'Allow Install App', name: 'allow_install_app', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Allow Camera Use', name: 'allow_camera_use', desc: '', type: 'checkbox', value: {
			0: [],
			1: [{title: 'Allow Facetime', name: 'allow_facetime', desc: '', type: 'checkbox', value: [0,1]}]
		}},
		{title: 'Allow Screen Capture', name: 'allow_screen_capture', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Allow Automatic Sync Roaming', name: 'allow_automatic_sync_roaming', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Allow Siri', name: 'allow_siri', desc: '', type: 'checkbox', value: {
			0: [],
			1: [{title: 'Allow Siri Device Locked', name: 'allow_siri_device_locked', desc: '', type: 'checkbox', value: [0,1]}]
		}},		
		{title: 'Allow Voice Dialing', name: 'allow_voice_dialing', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Allow Passbook While Locked', name: 'allow_passbook_while_locked', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Allow In App Purchase', name: 'allow_in_app_purchase', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Force User Enter Itunes Password For All Purchase', name: 'force_user_enter_itunes_password_for_all_purchase', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Allow Multiplayer', name: 'allow_multiplayer', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Allow Add Game Center Friends', name: 'allow_add_game_center_friends', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Applications', name: 'applications', desc: 'Enable access to applications on the device', type: 'section', value: [
			{title: 'Allow Youtube', name: 'allow_youtube', desc: '', type: 'checkbox', value: [0,1]},
			{title: 'Allow Itunes', name: 'allow_itunes', desc: '', type: 'checkbox', value: [0,1]},
			{title: 'Allow Safari', name: 'allow_safari', desc: '', type: 'chain-checkbox', value: [0,1], chain_value: [
				{title: 'Enable Autofill', name: 'enable_autofill', desc: '', type: 'checkbox', disabled: true, value: [0,1]},
				{title: 'Enable Fraud Warning', name: 'enable_fraud_warning', desc: '', type: 'checkbox', disabled: true, value: [0,1]},
				{title: 'Enable Javascript', name: 'enable_javascript', desc: '', type: 'checkbox', disabled: true, value: [0,1]},
				{title: 'Block Popups', name: 'block_popups', desc: '', type: 'checkbox', disabled: true, value: [0,1]},
				{title: 'Accept Cookies', name: 'accept_cookies', desc: 'Controls when Safari accets cookies', type: 'select', disabled: true, value: {
					0: 'Never',
					1: 'From Visited Site',
					2: 'Always'
				}}
			]}
		]},
		{title: 'iCloud', name: 'icloud', desc: 'Enable access to iCloud services', type: 'section', value:  [
			{title: 'Allow Backup', name: 'allow_backup', desc: '', type: 'checkbox', value: [0,1]},
			{title: 'Allow Document Sync', name: 'allow_document_sync', desc: '', type: 'checkbox', value: [0,1]},
			{title: 'Allow Photo Stream', name: 'allow_photo_stream', desc: '', type: 'checkbox', value: [0,1]},
			{title: 'Allow Shared Photostream', name: 'allow_shared_photostream', desc: '', type: 'checkbox', value: [0,1]}
		]},
		{title: 'Security And Privacy', name: 'security_and_privacy', desc: 'Enforce security and privacy', type: 'section', value:  [
			{title: 'Allow Diagnostic Data Send to Apple', name: 'allow_diagnostic_data_send_to_apple', desc: '', type: 'checkbox', value: [0,1]},
			{title: 'Allow User Accept Untrusted TLS Certificate', name: 'allow_user_accept_untrusted_tls_cert', desc: '', type: 'checkbox', value: [0,1]},
			{title: 'Force Encrypted Backups', name: 'force_encrypted_backups', desc: '', type: 'checkbox', value: [0,1]}
		]},
		{title: 'Content Ratings', name: 'content_ratings', desc: 'Control access to apps and media', type: 'section', value:  [
			{title: 'Allow Explicit', name: 'allow_explicit', desc: '', type: 'checkbox', value: [0,1]},
			{title: 'Allow iBook Erotica', name: 'allow_ibook_erotica', desc: '', type: 'checkbox', value: [0,1]},
			{title: 'Ratings Region', name: 'ratings_region', desc: 'Sets the region for the ratings', type: 'chain-select', value: {
				0: 'United States', 1: 'Australia', 2: 'Canada', 3: 'Germany', 4: 'France', 5: 'Ireland', 6: 'Japan', 7: 'New Zealand', 8: 'United Kingdom'}, 
				chain_value: [
					{title: 'Allow Content Ratings', name: 'allow_content_ratings', desc: 'Set the maximum allowed ratings', type: 'section', value: [
						[// United States
							{title: 'Movies', name: 'movies', desc: '', type: 'select', value: [
								'Dont\'t Allow Movies', 'G', 'PG', 'PG-13', 'R', 'NC-17', 'Allow All Movies'
							]},
							{title: 'TV Shows', name: 'tv_shows', desc: '', type: 'select', value: [
								'Dont\'t Allow TV Shows', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA', 'Allow All TV Shows'
							]},
							{title: 'Applications', name: 'apps', desc: '', type: 'select', value: [
								'Dont\'t Allow Apps', '4+', '9+', '12+', '17+', 'Allow All Apps'
							]}
						],
						[// Australia
							{title: 'movies', name: 'movies', desc: '', type: 'select', value: [ 
								'Dont\'t Allow Movies',  'G',  'PG',  'M',  'MA15+',  'R18+',  'Allow All Movies'
							]},
							{title: 'TV Shows', name: 'tv_shows', desc: '', type: 'select', value: [
								'Dont\'t Allow TV Shows', 'P', 'C', 'G', 'PG', 'M', 'MA15+', 'AV15+', 'Allow All TV Shows'
							]},
							{title: 'Applications', name: 'apps', desc: '', type: 'select', value: [
								'Dont\'t Allow Apps', '4+', '9+', '12+', '17+', 'Allow All Apps'
							]}
						],
						[// Canada
							{title: 'movies', name: 'movies', desc: '', type: 'select', value: [
								'Dont\'t Allow Movies', 'G', 'PG', '14A', '18A', 'R', 'Allow All Movies'
							]},
							{title: 'TV Shows', name: 'tv_shows', desc: '', type: 'select', value: [
								'Dont\'t Allow TV Shows', 'C', 'C8', 'G', 'PG', '14+', '18+', 'Allow All TV Shows'
							]},
							{title: 'Applications', name: 'apps', desc: '', type: 'select', value: [
								'Dont\'t Allow Apps', '4+', '9+', '12+', '17+', 'Allow All Apps'
							]}
						],
						[// Germany
							{title: 'movies', name: 'movies', desc: '', type: 'select', value: [
								'Dont\'t Allow Movies', 'ab 0 Jahren', 'ab 6 Jahren', 'ab 12 Jahren', 'ab 16 Jahren', 'ab 18 Jahren', 'Allow All Movies'
							]},
							{title: 'TV Shows', name: 'tv_shows', desc: '', type: 'select', value: [
								'Dont\'t Allow TV Shows', 'ab 0 Jahren', 'ab 6 Jahren', 'ab 12 Jahren', 'ab 16 Jahren', 'ab 18 Jahren', 'Allow All TV Shows'
							]},
							{title: 'Applications', name: 'apps', desc: '', type: 'select', value: [
								'Dont\'t Allow Apps', '4+', '9+', '12+', '17+', 'Allow All Apps'
							]}
						],
						[// France
							{title: 'movies', name: 'movies', desc: '', type: 'select', value: [
								'Dont\'t Allow Movies', '-10', '-12', '-16', '-18', 'Allow All Movies'
							]},
							{title: 'TV Shows', name: 'tv_shows', desc: '', type: 'select', value: [
								'Dont\'t Allow TV Shows', '-10', '-12', '-16', '-18', 'Allow All TV Shows'
							]},
							{title: 'Applications', name: 'apps', desc: '', type: 'select', value: [
								'Dont\'t Allow Apps', '4+', '9+', '12+', '17+', 'Allow All Apps'
							]}
						],
						[// Ireland
							{title: 'movies', name: 'movies', desc: '', type: 'select', value: [
								'Dont\'t Allow Movies',  'G',  'PG',  '12',  '15',  '16',  '18',  'Allow All Movies'
							]},
							{title: 'TV Shows', name: 'tv_shows', desc: '', type: 'select', value: [
								'Dont\'t Allow TV Shows', 'GA', 'Ch', 'YA', 'PS', 'MA', 'Allow All TV Shows'
							]},
							{title: 'Applications', name: 'apps', desc: '', type: 'select', value: [
								'Dont\'t Allow Apps', '4+', '9+', '12+', '17+', 'Allow All Apps'
							]}
						],
						[// Japan
							{title: 'movies', name: 'movies', desc: '', type: 'select', value: [
								'Dont\'t Allow Movies', 'G', 'PG-12', 'R-15', 'R-18', 'Allow All Movies'
							]},
							{title: 'TV Shows', name: 'tv_shows', desc: '', type: 'select', value: [
								'Dont\'t Allow TV Shows', 'Explicit Allowed', 'Allow All TV Shows'
							]},
							{title: 'Applications', name: 'apps', desc: '', type: 'select', value: [
								'Dont\'t Allow Apps', '4+', '9+', '12+', '17+', 'Allow All Apps'
							]}
						],
						[// New Zealand
							{title: 'movies', name: 'movies', desc: '', type: 'select', value: [
								'Dont\'t Allow Movies', 'G', 'PG', 'M', 'R13', 'R15', 'R16', 'R18', 'R', 'RP16', 'Allow All Movies'
							]},
							{title: 'TV Shows', name: 'tv_shows', desc: '', type: 'select', value: [
								'Dont\'t Allow TV Shows', 'G', 'PGR', 'AO', 'Allow All TV Shows'
							]},
							{title: 'Applications', name: 'apps', desc: '', type: 'select', value: [
								'Dont\'t Allow Apps',  '4+',  '9+',  '12+',  '17+',  'Allow All Apps'
							]}
						],
						[// United Kingdom
							{title: 'movies', name: 'movies', desc: '', type: 'select', value: 
								['Dont\'t Allow Movies', 'U', 'Uc', 'PG', '12', '12A', '15', '18', 'Allow All Movies']
							},
							{title: 'TV Shows', name: 'tv_shows', desc: '', type: 'select', value: [
								'Dont\'t Allow TV Shows', 'Caution', 'Allow All TV Shows'
							]},
							{title: 'Applications', name: 'apps', desc: '', type: 'select', value: [
								'Dont\'t Allow Apps', '4+', '9+', '12+', '17+', 'Allow All Apps'
							]}
						]
					]
					}			
				]
			},
		]}
	]},	
	{title: 'WiFi', name: 'wifi', desc: '', type: 'form', value: [
		{title: 'Service Set Identifier', name: 'service_set_identifier', desc: 'Identification of the wireless network to connect to', type: 'text', value: []},
		{title: 'Auto Join', name: 'auto_join', desc: 'Automatically join the target network', type: 'checkbox', value: [0,1]},
		{title: 'Hidden Network', name: 'hidden_network', desc: 'Enable if the target network is open or broadcasting', type: 'checkbox', value: [0,1]},
		{title: 'Security Type', name: 'security_type', desc: 'Wireless network encryption to use when connecting', type: 'chain-select', value: {
			0: 'None', 1: 'WEP', 2: 'WPA/ WPA2', 3: 'Any (Personal)', 4: 'WEP Enterprise', 5: 'WPA/ WPA2 Enterprise', 6: 'Any (Enterprise)'}, chain_value: [
				{title: '', name: '', desc: '', type: 'section', value: [
					[{title: '',name: '',desc: '',type: 'section',value: []}],
					[{title: 'Password', name: 'wep_password', desc: 'Password for authenticating to the wireless network',type: 'password',value: []}],
					[{title: 'Password', name: 'wpa_wpa2_password', desc: 'Password for authenticating to the wireless network', type: 'password', value: []}],
					[{title: 'Password', name: 'any_personal_password', desc: 'Password for authenticating to the wireless network', type: 'password', value: []}],
					// WEP Enterprise
					[{title: 'Enterprise Settings', name: 'enterprise_settings', desc: 'Configuration of protocols, authentication and trust', type: 'chain-select', value: {
						0: 'Protocols', 1: 'Authentication', 2: 'Trust'}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// protocols
									{title: '', name: '', desc: '', type: 'section', value: [
										{title: 'Accepted EAP', name: 'accepted_eap', desc: 'Authentication protocols supported on target network', type: 'section', value: [
											{title: 'TLS', name: 'tls', desc: '', type: 'checkbox', value: [0,1]},		
											{title: 'LEAP', name: 'leap', desc: '', type: 'checkbox', value: [0,1]},		
											{title: 'EAP-FAST', name: 'eap-fast', desc: '', type: 'checkbox', value: [0,1]},		
											{title: 'TTLS', name: 'ttls', desc: '', type: 'checkbox', value: [0,1]},		
											{title: 'PEAP', name: 'peap', desc: '', type: 'checkbox', value: [0,1]},		
											{title: 'EAP-SIM', name: 'eap-sim', desc: '', type: 'checkbox', value: [0,1]}
										]},
										{title: 'EAP-FAST', name: 'eap-fast', desc: 'Configuration of Protected Access Credential (PAC)', type: 'section', value: [
											// chained	
											{title: 'Use PAC', name: 'use_pac', desc: '', type: 'checkbox', value: [0,1]},		
											{title: 'Provision PAC', name: 'provision_pac', desc: '', type: 'checkbox', value: [0,1]},		
											{title: 'Provision PAC Anon', name: 'provision_pac_anon', desc: '', type: 'checkbox', value: [0,1]}
										]}
									]}
								],
								[// authentication
									{title: '', Name: '', desc: '', type: 'section', value: [
										{title: 'Username', name: 'username', desc: 'Username for connection to wireless network', type: 'text', value: []},
										{title: 'User Per Connection Password', name: 'user_per_connection_password', desc: 'Request during connection and send with authentication', type: 'checkbox', value: [0,1]},
										{title: 'Password', name: 'password', desc: 'Password for the provided username', type: 'password', value: []},
										{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credentials for connection to wireless nerwork', type: 'select', value: [] },// revisit
										{title: 'Outer Identity', name: 'outer_identity', desc: 'Externally visible identification (for TTLS, PEAP, and EAP-FAST)', type: 'select', value: []} // revisit
									]}
								],
								[// trust
									{title: '', name: '', desc: '', type: 'section', value: [
										{title: 'Trusted Certificates', name: 'trusted_certificates', desc: 'Certificates trusted/ expected for authentication', type: 'select',
											'empty_message': 'No certificate available. Use "Credentials" tab to add', value: []},// external data
										{title: 'Trusted Server Certificate Name', name: 'trusted_server_certificate_name', desc: 'Certificate names expected from authentication server', type: 'select', value: []}// external data
									]}
								]
							]
							}
						]
					}],
					// WPA/ WPA2 Enterprise
					[{title: 'Enterprise Settings', name: 'enterprise_settings', desc: 'Configuration of protocols, authentication and trust', type: 'chain-select', value: {
						0: 'Protocols', 1: 'Authentication', 2: 'Trust'}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// protocols
									{title: 'Accepted EAP', name: 'accepted_eap', desc: 'Authentication protocols supported on target network', type: 'section', value: [		
										{title: 'TLS', name: 'tls', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'LEAP', name: 'leap', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'EAP-FAST', name: 'eap-fast', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'TTLS', name: 'ttls', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'PEAP', name: 'peap', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'EAP-SIM', name: 'eap-sim', desc: '', type: 'checkbox', value: [0,1]}
									]},
									{title: 'EAP-FAST', name: 'eap-fast', desc: 'Configuration of Protected Access Credential (PAC)', type: 'section', value: [
									// chained	
										{title: 'Use PAC', name: 'use_pac', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'Provision PAC', name: 'provision_pac', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'Provision PAC Anon', name: 'provision_pac_anon', desc: '', type: 'checkbox', value: [0,1]}
									]}
								],
								[// authentication
									{title: 'Username', name: 'username', desc: 'Username for connection to wireless network', type: 'text', value: []},
									{title: 'User Per Connection Password', name: 'user_per_connection_password', desc: 'Request during connection and send with authentication', type: 'checkbox', value: [0,1]},
									{title: 'Password', name: 'password', desc: 'Password for the provided username', type: 'password', value: []},
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credentials for connection to wireless nerwork', type: 'select', value: []}, // revisit
									{title: 'Outer Identity', name: 'outer_identity', desc: 'Externally visible identification (for TTLS, PEAP, and EAP-FAST)', type: 'select', value: []} // revisit
								],
								[// trust
									{title: 'Trusted Certificates', name: 'trusted_certificates', desc: 'Certificates trusted/ expected for authentication', type: 'select', 'empty_message': 'No certificate available. Use "Credentials" tab to add', value: []},// external data
									{title: 'Trusted Server Certificate Name', name: 'trusted_server_certificate_name', desc: 'Certificate names expected from authentication server', type: 'select', value: []}// external data
								]
							]
							}
						]
					}],
					// Any (Enterprise)
					[{title: 'Enterprise Settings', name: 'enterprise_settings', desc: 'Configuration of protocols, authentication and trust', type: 'chain-select', value: {
						0: 'Protocols', 1: 'Authentication', 2: 'Trust'}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// protocols
									{title: 'Accepted EAP', name: 'accepted_eap', desc: 'Authentication protocols supported on target network', type: 'section', value: [				
										{title: 'TLS', name: 'tls', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'LEAP', name: 'leap', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'EAP-FAST', name: 'eap-fast', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'TTLS', name: 'ttls', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'PEAP', name: 'peap', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'EAP-SIM', name: 'eap-sim', desc: '', type: 'checkbox', value: [0,1]}
									]},
									{title: 'EAP-FAST', name: 'eap-fast', desc: 'Configuration of Protected Access Credential (PAC)', type: 'section', value: [
										// chained	
										{title: 'Use PAC', name: 'use_pac', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'Provision PAC', name: 'provision_pac', desc: '', type: 'checkbox', value: [0,1]},		
										{title: 'Provision PAC Anon', name: 'provision_pac_anon', desc: '', type: 'checkbox', value: [0,1]}
									]}
								],
								[// authentication
									{title: 'Username', name: 'username', desc: 'Username for connection to wireless network', type: 'text', value: []},
									{title: 'User Per Connection Password', name: 'user_per_connection_password', desc: 'Request during connection and send with authentication', type: 'checkbox', value: [0,1]},
									{title: 'Password', name: 'password', desc: 'Password for the provided username', type: 'password', value: []},
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credentials for connection to wireless nerwork', type: 'select', value: []}, // revisit
									{title: 'Outer Identity', name: 'outer_identity', desc: 'Externally visible identification (for TTLS, PEAP, and EAP-FAST)', type: 'select', value: []} // revisit
								],
								[// trust
									{title: 'Trusted Certificates', name: 'trusted_certificates', desc: 'Certificates trusted/ expected for authentication', type: 'select', 'empty_message': 'No certificate available. Use "Credentials" tab to add', value: []},// external data
									{title: 'Trusted Server Certificate Name', name: 'trusted_server_certificate_name', desc: 'Certificate names expected from authentication server', type: 'select', value: []}// external data
								]
							]
							}
						]
					}]
				]
				}
			]

		},
		{title: 'Proxy', name: 'proxy', desc: 'Proxy settings for this Wi-Fi connection', type: 'chain-select', value: {
			0: 'None', 1: 'Manual', 2: 'Automatic'}, chain_value: [
				{title: '', name: '', desc: '', type: 'section', value: [
					[// None
						{title: '', name: '', desc: '', type: '', value: []}
					],
					[// Manual
						{title: 'Server and Port', name: '', desc: 'Fully qualified address and port of the proxy server', type: 'section', value: [
							{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},
							{title: 'Port', name: 'port', desc: '', type: 'text', value: 0},
							{title: 'Authentication', name: 'authentication', desc: 'Username used to connect to the proxy server', type: 'text', value: []},		
							{title: 'Password', name: 'password', desc: 'Password used when connecting to the proxy server', type: 'text', value: []}
						]}
					],
					[// Automatic
						{title: 'Proxy Server URL', name: 'proxy_server_url', desc: '', type: 'text', value: []}
					]
				]
				}
		]}
	]},
	{title: 'VPN', name: 'vpn', desc: '', type: 'form', value: [
		{title: 'Connection Name', name: 'connection_name', desc: 'Display name of the connection(displayed on the device)', type: 'text', value: 'VPN Configuration'},
		{title: 'Connection Type', name: 'connection_type', desc: 'The type of connection enabled by this policy', type: 'chain-select', value: {
			0: 'LT2P', 1: 'PPTP', 2: 'IPSec (Cisco)', 3: 'Cisco AnyConnect', 4: 'Juniper SSL', 5: 'F5 SSL', 6: 'SonicWALL Mobile Connect', 7: 'Aruba VIA', 8: 'Check Point Mobile VPN', 9: 'OpenVPN', 10: 'Custom SSL'}, chain_value: [
			{title: '', Name: '', desc: '', type: 'section', value: [
				[// LT2P
					{title: '', Name: '', desc: '', type: 'section', value: [
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},		
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},		
						{title: 'User Authentication', name: 'user_authentication', desc: 'Authentication type for connection', type: 'section', value: [
							{title: 'Password', name: 'user_authentication', desc: '', type: 'radio', value: 'password'},
							{title: 'RSA SecureID', name: 'user_authentication', desc: '', type: 'radio', value: 'rsa_secureid'}
						]},		
						{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []},		
						{title: 'Shared Secret', name: 'shared_secret', desc: 'Shared secret for the connection', type: 'password', value: []},		
						{title: 'Send All Traffic', name: 'send_all_traffic', desc: 'Routes all network traffic through the VPN connection', type: 'checkbox', value: []}		
					]}
				],
				[// PPTP
					{title: '', Name: '', desc: '', type: 'section', value: [
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},	
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},		
						{title: 'User Authentication', name: 'user_authentication', desc: 'Authentication type for connection', type: 'section', value: [
							{title: 'Password', name: 'user_authentication', desc: '', type: 'radio', value: []},
							{title: 'RSA SecureID', name: 'user_authentication', desc: '', type: 'radio', value: []}
						]},		
						{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []},		
						{title: 'Encription Level', name: 'encription_level', desc: 'Level of data encryption applied to the connection', type: 'select', value: {
							0: 'None', 1: 'Automatic', 2: 'Maximum 128bit'
						}},		
						{title: 'Send All Traffic', name: 'send_all_traffic', desc: 'Routes all network traffic through the VPN connection', type: 'checkbox', value: []}
					]}
				],
				[// IPSec (Cisco)
					{title: '', Name: '', desc: '', type: 'section', value: [
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},	
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},			
						{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []},		
						{title: 'Machine Authentication', name: 'machine_authentication', desc: 'Authentication type for connection', type: 'chain-select', value: {
							0: 'Certificate', 1: 'Shared Secret/ Group Name'
						}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// Certificate
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credential for authenticating the connection', type: 'select', value: []}, // dynamic values
									{title: 'Include User PIN', name: 'include_user_pin', desc: 'Request PIN during connection, and send with authentication', type: 'checkbox', value: [0,1]},
									{title: 'Enable VPN On Demand', name: 'enable_vpn_on_demand', desc: 'Domain and host names that will establish a VPN', type: 'chain-checkbox', value: [0,1], chain_value: [
										{title: '', name: 'enable_vpn_on_demand_select', desc: '', type: 'select-multiple', disabled: true, value: [0,1,2,3]} // enable if enable_vpn_on_demand checked
									]} // multi-select, addable, dynamic values
								],
								[// Shared Secret Group Name
									{title: 'Group Name', name: 'group_name', desc: 'Group identifier for the connection', type: 'chain-text', value: [], chain_value: [
											{title: 'Shared Secret', name: 'shared_secret', desc: 'Shared secret for the connection', type: 'password', disabled: true, value: []},

											{title: 'Use Hybrid Auth', name: 'use_hybrid_auth', desc: 'Authenticate using secret, name, and server-side certificate', type: 'checkbox', disabled: true, value: []}, // enable if group_name !null
											{title: 'Prompt Password', name: 'prompt_password', desc: 'Prompt user for password on the device', type: 'checkbox', disabled: true, value: []} // enable if group_name !null
									]},	
								]
							]}
						]}
					]}
				],
				[// Cisco AnyConnect
					{title: '', Name: '', desc: '', type: 'section', value: [
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},	
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},		
						{title: 'Group', name: 'group', desc: 'Group for authenticating the connection', type: 'text', value: []},		
						{title: 'User Authentication', name: 'user_authentication', desc: 'Authentication type for the connection', type: 'chain-select', value: {
							0: 'Password', 1: 'Certificate'
						}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// Password
									{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []}
								],
								[// Certificate
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credential for authenticating the connection', type: 'select', value: []}, // dynamic values
									{title: 'Enable VPN On Demand', name: 'enable_vpn_on_demand', desc: 'Domain and host names that will establish a VPN', type: 'chain-checkbox', value: [0,1], chain_value: [
										{title: '', name: 'enable_vpn_on_demand_select', desc: '', type: 'select-multiple', disabled: true, value: [0,1,2,3]} // enable if enable_vpn_on_demand checked
									]} // multi-select, addable, dynamic values
								]
							]}
						]}						
					]}
				],
				[// Juniper SSL
					{title: '', Name: '', desc: '', type: 'section', value: [
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},	
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},		
						{title: 'Realm', name: 'realm', desc: 'Realm for authenticating the connection', type: 'text', value: []},		
						{title: 'Role', name: 'role', desc: 'Role for authenticating the connection', type: 'text', value: []},		
						{title: 'User Authentication', name: 'user_authentication', desc: 'Authentication type for the connection', type: 'chain-select', value: {
							0: 'Password', 1: 'RSA SecureID'
						}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// Password
									{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []}
								],
								[// RSA SecureID
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credential for authenticating the connection', type: 'select', value: []}, // dynamic values
									{title: 'Enable VPN On Demand', name: 'enable_vpn_on_demand', desc: 'Domain and host names that will establish a VPN', type: 'chain-checkbox', value: [0,1], chain_value: [
										{title: '', name: 'enable_vpn_on_demand_select', desc: '', type: 'select-multiple', disabled: true, value: [0,1,2,3]} // enable if enable_vpn_on_demand checked
									]} // multi-select, addable, dynamic values
								]
							]}
						]}
					]}
				],
				[// F5 SSL
					{title: '', name: '', desc: '', type: 'section', value: [
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},	
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},	
						{title: 'User Authentication', name: 'user_authentication', desc: 'Authentication type for the connection', type: 'chain-select', value: {
							0: 'Password', 1: 'Certificate'
						}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// Password
									{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []}
								],
								[// Certificate
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credential for authenticating the connection', type: 'select', value: []}, // dynamic values
									{title: 'Enable VPN On Demand', name: 'enable_vpn_on_demand', desc: 'Domain and host names that will establish a VPN', type: 'chain-checkbox', value: [0,1], chain_value: [
										{title: '', name: 'enable_vpn_on_demand_select', desc: '', type: 'select-multiple', disabled: true, value: [0,1,2,3]} // enable if enable_vpn_on_demand checked
									]} // multi-select, addable, dynamic values
								]
							]}
						]}
					]}
				],
				[// SonicWALL Mobile Connect
					{title: '', name: '', desc: '', type: 'section', value: [
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},	
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},	
						{title: 'Login Group or Domain', name: 'login_group_domain', desc: 'Login group or domain for the connection', type: 'text', value: []},	
						{title: 'User Authentication', name: 'user_authentication', desc: 'Authentication type for the connection', type: 'chain-select', value: {
							0: 'Password', 1: 'Certificate'
						}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// Password
									{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []}
								],
								[// Certificate
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credential for authenticating the connection', type: 'select', value: []}, // dynamic values
									{title: 'Enable VPN On Demand', name: 'enable_vpn_on_demand', desc: 'Domain and host names that will establish a VPN', type: 'chain-checkbox', value: [0,1], chain_value: [
										{title: '', name: 'enable_vpn_on_demand_select', desc: '', type: 'select-multiple', disabled: true, value: [0,1,2,3]} // enable if enable_vpn_on_demand checked
									]} // multi-select, addable, dynamic values
								]
							]}
						]}
					]}
				],
				[// Aruba VIA
					{title: '', name: '', desc: '', type: 'section', value: [
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},	
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},	
						{title: 'User Authentication', name: 'user_authentication', desc: 'Authentication type for the connection', type: 'chain-select', value: {
							0: 'Password', 1: 'Certificate'
						}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// Password
									{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []}
								],
								[// Certificate
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credential for authenticating the connection', type: 'select', value: []}, // dynamic values
									{title: 'Enable VPN On Demand', name: 'enable_vpn_on_demand', desc: 'Domain and host names that will establish a VPN', type: 'chain-checkbox', value: [0,1], chain_value: [
										{title: '', name: 'enable_vpn_on_demand_select', desc: '', type: 'select-multiple', disabled: true, value: [0,1,2,3]} // enable if enable_vpn_on_demand checked
									]} // multi-select, addable, dynamic values
								]
							]}
						]}
					]}
				],
				[// Check Point Mobile VPN
					{title: '', name: '', desc: '', type: 'section', value: [
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},	
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},	
						{title: 'User Authentication', name: 'user_authentication', desc: 'Authentication type for the connection', type: 'chain-select', value: {
							0: 'Password', 1: 'Certificate'
						}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// Password
									{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []}
								],
								[// Certificate
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credential for authenticating the connection', type: 'select', value: []}, // dynamic values
									{title: 'Enable VPN On Demand', name: 'enable_vpn_on_demand', desc: 'Domain and host names that will establish a VPN', type: 'chain-checkbox', value: [0,1], chain_value: [
										{title: '', name: 'enable_vpn_on_demand_select', desc: '', type: 'select-multiple', disabled: true, value: [0,1,2,3]} // enable if enable_vpn_on_demand checked
									]} // multi-select, addable, dynamic values
								]
							]}
						]}
					]}
				],
				[// OpenVPN
					{title: '', name: '', desc: '', type: 'section', value: [
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},	
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},	
						{title: 'User Authentication', name: 'user_authentication', desc: 'Authentication type for the connection', type: 'chain-select', value: {
							0: 'Password', 1: 'Certificate'
						}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// Password
									{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []}
								],
								[// Certificate
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credential for authenticating the connection', type: 'select', value: []}, // dynamic values
									{title: 'Enable VPN On Demand', name: 'enable_vpn_on_demand', desc: 'Domain and host names that will establish a VPN', type: 'chain-checkbox', value: [0,1], chain_value: [
										{title: '', name: 'enable_vpn_on_demand_select', desc: '', type: 'select-multiple', disabled: true, value: [0,1,2,3]} // enable if enable_vpn_on_demand checked
									]} // multi-select, addable, dynamic values
								]
							]}
						]}
					]}
				],
				[// Custom SSL
					{title: '', name: '', desc: '', type: 'section', value: [
						{title: 'Identifier', name: 'identifier', desc: 'Identifier for the custom SSL VPN(reverse DNS format)', type: 'checkbox', value: []},		
						{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},	
						{title: 'Account', name: 'account', desc: 'User account for authenticating the connection', type: 'text', value: []},	
						{title: 'Custom Data', name: 'custom_data', desc: 'Keys and string values for custom data', type: 'text', value: []}, // manual add value (key/value) 2 col
						{title: 'User Authentication', name: 'user_authentication', desc: 'Authentication type for the connection', type: 'chain-select', value: {
							0: 'Password', 1: 'Certificate'
						}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// Password
									{title: 'Password', name: 'password', desc: 'Password for authenticating the connection', type: 'password', value: []}
								],
								[// Certificate
									{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credential for authenticating the connection', type: 'select', value: []}, // dynamic values
									{title: 'Enable VPN On Demand', name: 'enable_vpn_on_demand', desc: 'Domain and host names that will establish a VPN', type: 'chain-checkbox', value: [0,1], chain_value: [
										{title: '', name: 'enable_vpn_on_demand_select', desc: '', type: 'select-multiple', disabled: true, value: [0,1,2,3]} // enable if enable_vpn_on_demand checked
									]} // multi-select, addable, dynamic values
								]
							]}
						]}
					]}
				]
			]},
		]},
		{title: 'Proxy', name: 'proxy', desc: 'Proxy settings for this VPN connection', type: 'chain-select', value: {
			0: 'None', 1: 'Manual', 2: 'Automatic'}, chain_value: [
				{title: '', name: '', desc: '', type: 'section', value: [
					[// None
						{title: '', name: '', desc: '', type: '', value: []}
					],
					[// Manual
						{title: 'Server and Port', name: '', desc: 'Fully qualified address and port of the proxy server', type: 'section', value: [
							{title: 'Server', name: 'server', desc: 'Hostname or IP address for server', type: 'text', value: []},
							{title: 'Port', name: 'port', desc: '', type: 'text', value: 0},
							{title: 'Authentication', name: 'authentication', desc: 'Username used to connect to the proxy server', type: 'text', value: []},		
							{title: 'Password', name: 'password', desc: 'Password used when connecting to the proxy server', type: 'text', value: []}
						]}
					],
					[// Automatic
						{title: 'Proxy Server URL', name: 'proxy_server_url', desc: '', type: 'text', value: []}
					]
				]}
		]}
	]},	
	{title: 'Email', name: 'email', desc: '', type: 'form', value: [
		{title: 'Account Desc', name: 'account_desc', desc: 'The display name of the account(e.g. "Company Mail Account")', type: 'text', value: 'Company Account'}, // default value = Company Account	
		{title: 'Account Type', name: 'account_type', desc: 'The protocol for accessing the email account', type: 'chain-select', value: {
			0: 'IMAP', 1: 'POP'}, chain_value: [
				{title: '', name: '', desc: '', type: 'section', value: [
					[// IMAP
						{title: 'Path Prefix', name: 'path_prefix', desc: '', type: 'text', value: []}
					],
					[// POP
						{title: 'Path Prefix', name: 'path_prefix', desc: '', type: 'text', disabled: true, value: []}
					]
				]}
		]},
		{title: 'User Display Name', name: 'user_display_name', desc: 'The name of the user', type: 'text', value: []},
		{title: 'Email Address', name: 'email_address', desc: 'The address of the account', type: 'text', value: []},
		{title: 'Allow Move', name: 'allow_move', desc: 'Allow user to move messages from this account', type: 'text', value: []},


		{title: '', name: '', desc: '', type: 'chain-select', value: {
			0: 'Incoming Mail', 1: 'Outgoing Mail'}, chain_value: [
				{title: '', name: '', desc: '', type: 'section', value: [
					[// Incoming Mail
						{title: 'Mail Server', name: 'mail_server', desc: '', type: 'text', value: []},
						{title: 'Port', name: 'port', desc: 'Hostname or IP address, and port number for incoming email', type: 'text', value: 143}, //default value = http:// 143, https:// 993
						{title: 'User Name', name: 'user_name', desc: 'The username used to connect to the server for incoming mail', type: 'text', value: []},
						{title: 'Authentication Type', name: 'authentication_type', desc: 'The authentication method for the incoming mail server', type: 'chain-select', value: {0: 'None', 1: 'Password', 2: 'MD5 Challenge-Response', 3: 'NTLM', 4: 'HTTP MD5 Digest'}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// None
									{title: 'Password', name: 'password', desc: 'Password for the incoming mail server', type: 'text', disabled: true, value: []}
								],
								[// Password
									{title: 'Password', name: 'password', desc: 'Password for the incoming mail server', type: 'text', value: []}
								],
								[// MD5 Challenge-Response
									{title: 'Password', name: 'password', desc: 'Password for the incoming mail server', type: 'text', value: []}
								],
								[// NTLM
									{title: 'Password', name: 'password', desc: 'Password for the incoming mail server', type: 'text', value: []}
								],
								[// HTTP MD5 Digest
									{title: 'Password', name: 'password', desc: 'Password for the incoming mail server', type: 'text', value: []}
								]
							]}
						]},
						{title: 'Use SSL', name: 'use_ssl', desc: 'Retrieve incoming mail through secure socket layer', type: 'checkbox', value: [0,1]} // change port number to 993
					],
					[// Outgoing Mail
						{title: 'Mail Server', name: 'mail_server', desc: '', type: 'text', value: []},
						{title: 'Port', name: 'port', desc: 'Hostname or IP address, and port number for incoming email', type: 'text', value: 587}, //default value = 587
						{title: 'User Name', name: 'user_name', desc: 'The username used to connect to the server for incoming mail', type: 'text', value: []},
						{title: 'Authentication Type', name: 'authentication_type', desc: 'The authentication method for the incoming mail server', type: 'chain-select', value: {0: 'None', 1: 'Password', 2: 'MD5 Challenge-Response', 3: 'NTLM', 4: 'HTTP MD5 Digest'}, chain_value: [
							{title: '', name: '', desc: '', type: 'section', value: [
								[// None
									{title: 'Password', name: 'password', desc: 'SMTP authentication uses the same password as POP/IMAP', type: 'password', disabled: true, value: []},
									{title: 'Outgoing Password Same Incoming', name: 'outgoing_password_same_incoming', desc: 'Include this account in the recent address syncing', type: 'checkbox', disabled: true, value: [0,1]}
								],
								[// Password
									{title: 'Password', name: 'password', desc: 'SMTP authentication uses the same password as POP/IMAP', type: 'password', value: []},
									{title: 'Outgoing Password Same Incoming', name: 'outgoing_password_same_incoming', desc: 'Include this account in the recent address syncing', type: 'checkbox', value: [0,1]}
								],
								[// MD5 Challenge-Response
									{title: 'Password', name: 'password', desc: 'SMTP authentication uses the same password as POP/IMAP', type: 'password', value: []},
									{title: 'Outgoing Password Same Incoming', name: 'outgoing_password_same_incoming', desc: 'Include this account in the recent address syncing', type: 'checkbox', value: [0,1]}
								],
								[// NTLM
									{title: 'Password', name: 'password', desc: 'SMTP authentication uses the same password as POP/IMAP', type: 'password', value: []},,
									{title: 'Outgoing Password Same Incoming', name: 'outgoing_password_same_incoming', desc: 'Include this account in the recent address syncing', type: 'checkbox', value: [0,1]}
								],
								[// HTTP MD5 Digest
									{title: 'Password', name: 'password', desc: 'SMTP authentication uses the same password as POP/IMAP', type: 'password', value: []},
									{title: 'Outgoing Password Same Incoming', name: 'outgoing_password_same_incoming', desc: 'Include this account in the recent address syncing', type: 'checkbox', value: [0,1]}
								]
							]}
						]},
						{title: 'Allow Recent Address Syncing', name: 'allow_recent_address_syncing', desc: 'Send outgoing mail from this account only from Mail app', type: 'checkbox', value: [0,1]},	// default 1
						{title: 'Use Only in Mail', name: 'use_only_in_mail', desc: 'Send outgoing mail from this account only from Mail app', type: 'checkbox', value: [0,1]},
						{title: 'Use SSL', name: 'use_ssl', desc: 'Send outgoing mail through secure socket layer', type: 'checkbox', value: [0,1]},
						{title: 'Use S/MIME', name: 'use_s-mime', desc: 'Send outgoing mail using S/MIME encryption', type: 'checkbox', value: [0,1]}
					]
				]}
		]}
	]},
	{title: 'Exchange ActiveSync', name: 'exchange_activesync', desc: '', type: 'form', value: [
		{title: 'Account Name', name: 'account_name', desc: 'Name for the  Exchange ActiveSync account', type: 'text', value: 'Exchange ActiveSync'},	// default value = Exchange ActiveSync
		{title: 'Exchange ActiveSync Host', name: 'exchange_activesync_host', desc: 'Microsoft Exchange Server', type: 'text', value: []},	
		{title: 'Allow Move', name: 'allow_move', desc: 'Allow user to move messages from this account', type: 'checkbox', value: [0,1]},	
		{title: 'Allow Recent Address Syncing', name: 'allow_recent_address_syncing', desc: 'Include this account in recent address syncing', type: 'checkbox', value: [0,1]},	
		{title: 'Use Only In Mail', name: 'use_only_in_mail', desc: 'Send outgoing mail from this account only from Mail app', type: 'checkbox', value: [0,1]},	
		{title: 'Use SSL', name: 'use_ssl', desc: 'Send all communication through secure socket layer', type: 'checkbox', value: [0,1]},
		{title: 'Use S/MIME', name: 'use_s-mime', desc: 'Send outgoing main using S/MIME encryption', type: 'chain-checkbox', value: [0,1], chain_value: [
			{title: 'Signing Certificate', name: 'signing_certificate', desc: 'Credentials for signing MIME data', type: 'select', disabled: true, value: [0,1]},// dynamic value
			{title: 'Encryption Certificate', name: 'encryption_certificate', desc: 'Credentials for encrypting MIME data', type: 'select', disabled: true, value: [0,1]}// dynamic value
		]},			
		{title: 'Domain', name: 'domain', desc: 'Domain for the account. Domain and User must be blank for device to prompt for user', type: 'text', value: []},	
		{title: 'User', name: 'user', desc: 'User for the account. Domain and User must be blank for the device to prompt user', type: 'text', value: []},	
		{title: 'Email Address', name: 'email_address', desc: 'The address of the account', type: 'text', value: []},	
		{title: 'Password', name: 'password', desc: 'The password for the account', type: 'password', value: []},	
		{title: 'Past Days Of Mail Sync', name: 'past_days_of_mail_sync', desc: 'The number of past days of mail to sync', type: 'select', value: {0: 'Unlimited', 1: 'One Day', 2: 'Three Days', 3: 'One Week', 4: 'Two Weeks', 5: 'One Month'}},	
		{title: 'Use SSL', name: 'use_ssl', desc: 'Send all communication through secure socket layer', type: 'checkbox', value: [0,1]},	
		{title: 'Identity Certificate', name: 'identity_certificate', desc: 'Credentials for connection to ActiveSync', type: 'select', value: [0,1]},	// dynamic value
		{title: 'Make Identity Certificate Compatible', name: 'make_identity_certificate_compatible', desc: 'Embed identity certificate in payload for compatibility with iOS 4', type: 'checkbox', value: [0,1]}	
	]},
	{title: 'LDAP', name: 'ldap', desc: '', type: 'form', value: [
		{title: 'Account Description', name: 'account_description', desc: 'The display name of the account (e.g. "Company LDAP Account")', type: 'text', value: 'LDAP Account'},	
		{title: 'Account Username', name: 'account_username', desc: 'The username for this LDAP account', type: 'text', value: []},	
		{title: 'Account Password', name: 'account_password', desc: 'The password for this LDAP', type: 'password', value: []},	
		{title: 'Account Hostname', name: 'account_hostname', desc: 'The LDAP hostname or IP address', type: 'text', value: []},	
		{title: 'Use SSL', name: 'use_ssl', desc: 'Enable Secure Socket Layer for this LDAP server', type: 'checkbox', value: [0,1]},	
		{title: 'Search Setting', name: 'search_setting', desc: 'Search settings for this LDAP server', type: 'textarea', value: []}	// dynamic table. Description/Scope/Search Base
	]},
	{title: 'Calendar', name: 'calendar', desc: '', type: 'form', value: [
		{title: 'Account Description', name: 'account_description', desc: 'The display name of the account (e.g. "Company calDAV Account")', type: 'text', value: 'CalDAV Account'},	// default value = CalDAV Account	
		{title: 'Account Hostname', name: 'account_hostname', desc: '', type: 'text', value: []},
		{title: 'Account Hostname Port', name: 'account_hostname_port', desc: 'The CalDAV hostname or IP address and port number', type: 'text', value: '8443'},	// default 8443
		{title: 'Principal Account', name: 'principal_account', desc: 'The Principal URL for the CalDAV account', type: 'text', value: []},		
		{title: 'Account Username', name: 'account_username', desc: 'The CalDAV username', type: 'text', value: []},		
		{title: 'Account Password', name: 'account_password', desc: 'The CalDAV password', type: 'password', value: []},	// dynamic table. Description/Scope/Search Base	
		{title: 'Use SSL', name: 'use_ssl', desc: 'Enable Secure Socket Layer communication with CalDAV server', type: 'checkbox', value: [0,1]}
	]},
	{title: 'Subscribed Calendar', name: 'subscribed_calendar', desc: '', type: 'form', value: [
		{title: 'Description', name: 'description', desc: 'The description of the calendar subscription', type: 'text', value: []},
		{title: 'URL', name: 'url', desc: 'The URL of the calendar file', type: 'text', value: []},
		{title: 'Username', name: 'username', desc: 'The username for this subscription', type: 'text', value: []},
		{title: 'Password', name: 'password', desc: 'The password for this subscription', type: 'password', value: []},
		{title: 'Use SSL', name: 'use_ssl', desc: '', type: 'checkbox', value: [0,1]}
	]},
	{title: 'Contacts', name: 'contacts', desc: '', type: 'form', value: [
		{title: 'Account Description', name: 'account_description', desc: 'The display name of the account (e.g. "Company CardDAV Account")', type: 'text', value: []},	// default CardDAV Account	
		{title: 'Account Hostname', name: 'account_hostname', desc: '', type: 'text', value: []},
		{title: 'Account Hostname Port', name: 'account_hostname_port', desc: 'The CardDAV hostname or IP address and port number', type: 'text', value: '8843'},	// default 8843
		{title: 'Principal URL', name: 'principal_url', desc: 'The Principal URL for the CardDAV account', type: 'text', value: []},		
		{title: 'Account Username', name: 'account_username', desc: 'The CardDAV username', type: 'text', value: []},		
		{title: 'Account Password', name: 'account_password', desc: 'The CardDAV password', type: 'password', value: []},		
		{title: 'Use SSL', name: 'use_ssl', desc: 'Enable Secure Socket Layer communication with CardDAV server', type: 'checkbox', value: [0,1]}	
	]},
	{title: 'Web Clips', name: 'web_clips', desc: '', type: 'form', value: [
		{title: 'Label', name: 'label', desc: 'The name to display for the Web Clip', type: 'text', value: []},
		{title: 'URL', name: 'url', desc: 'The URL to be displayed when selecting the Web Clip', type: 'text', value: []},
		{title: 'Removable', name: 'removable', desc: 'Enable removal of the Web Clip', type: 'checkbox', value: []},
		{title: 'Icon', name: 'icon', desc: 'The icon used for the web clip', type: 'file', value: []},
		{title: 'Precomposed Icon', name: 'precomposed_icon', desc: 'The icon will be displayed with no added visual effects', type: 'checkbox', value: [0,1]}, // false = dynamicly add layer fx on icon
		{title: 'Full Screen', name: 'full_screen', desc: 'Controls whether the web clip launches as a Full Screen application', type: 'checkbox', value: [0,1]}
	]},
	{title: 'Credentials', name: 'credentials', desc: '', type: 'form', value: [
		// Flows: Add cert ->  view cert
		// {title: 'Personal Certificate Store', name: 'personal_certificate_store', desc: 'Select the certificate(s) you\'d like to use.', type: 'section', value: [
		// 	{title: 'Personal Certificate store', name: 'personal_certificate_store', desc: '', type: 'file', value: []}	//browse certificates
		// ]},
		{title: 'Credential Name', name: 'credential_name', desc: 'Name or description of the credential', type: 'text', value: []},		
		{title: 'Certificate Data', name: 'certificate_data', desc: 'Details of specified certificate', type: 'button', value: 'View Certificate'}	 //certificate viewer	
	]},
	{title: 'SCEP', name: 'scep', desc: '', type: 'form', value: [
		{title: 'URL', name: 'url', desc: 'The base URL for the SCEP server', type: 'text', value: []},
		{title: 'Name', name: 'name', desc: 'The name of the instance: CA-IDENT', type: 'text', value: []},
		{title: 'Subject', name: 'subject', desc: 'Representation of an X.500 name (ex. O=Company, CN=Foo', type: 'text', value: []},
		{title: 'Subject Alternative Name Type', name: 'subject_alternative_name_type', desc: 'The type of a subject alternative name', type: 'chain-select', value: {0: 'None', 1: 'RFC 822 Name', 2: 'DNS Name', 3: 'Uniform Resource Identifier'}, chain_value: [
				{title: '', name: '', desc: '', type: 'section', value: [
					[// None
						{title: 'Subject Alternative Name Value', name: 'subject_alternative_name_value', desc: 'The value of a subject alternative name', type: 'text', disabled: true, value: []},
						{title: 'NT Principal Name', name: 'nt_principal_name', desc: 'An optional principal name for use in the certificate request', type: 'text', disabled: true, value: []}
					],
					[// RFC 822 Name
						{title: 'Subject Alternative Name Value', name: 'subject_alternative_name_value', desc: 'The value of a subject alternative name', type: 'text', value: []},
						{title: 'NT Principal Name', name: 'nt_principal_name', desc: 'An optional principal name for use in the certificate request', type: 'text', value: []}
					],
					[// DNS Name
						{title: 'Subject Alternative Name Value', name: 'subject_alternative_name_value', desc: 'The value of a subject alternative name', type: 'text', value: []},
						{title: 'NT Principal Name', name: 'nt_principal_name', desc: 'An optional principal name for use in the certificate request', type: 'text', value: []}
					],
					[// Uniform Resource Identifier
						{title: 'Subject Alternative Name Value', name: 'subject_alternative_name_value', desc: 'The value of a subject alternative name', type: 'text', value: []},
						{title: 'NT Principal Name', name: 'nt_principal_name', desc: 'An optional principal name for use in the certificate request', type: 'text', value: []}
					]
				]}
		]},
		
		

		{title: 'Challenge', name: 'challenge', desc: 'Used as the pre-shared secret for automatic enrollment', type: 'text', value: []},
		{title: 'Retries', name: 'retries', desc: 'The number of times to retry after PENDING response', type: 'text', value: 3},
		{title: 'Retry Delay', name: 'retry_delay', desc: 'The number of seconds to wait between subsequent retries', type: 'text', value: 10},
		{title: 'Key Size', name: 'key_size', desc: 'Representation of an X.500 name (ex. O=Company, CN=Foo', type: 'select', value: {0: 1024, 1: 2048}},
		{title: 'Use Digital Signature', name: 'use_digital_signature', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Use Key Encipherment', name: 'use_key_encipherment', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Fingerprint', name: 'fingerprint', desc: 'Enter hex string to be used as a fingerprint or use button to create fingerprint from Certificate', type: 'file', value: []}, // create from certificate locally
	]},
	{title: 'Mobile Device Management', name: 'mobile_device_management', desc: '', type: 'form', value: [
		{title: 'Server URL', name: 'server_url', desc: 'The URL of the Mobile Device Management server', type: 'text', value: []},	
		{title: 'Check In URL', name: 'check_in_url', desc: 'The URL that the device will use to check in during installation', type: 'text', value: []},	
		{title: 'Topic', name: 'topic', desc: 'Push notification Topic for Management messages', type: 'text', value: []},	
		{title: 'Identity', name: 'identity', desc: 'Cryptographic credential used for authentication', type: 'select', value: 0},	// dynamic value
		{title: 'Sign Messages', name: 'sign_messages', desc: '', type: 'checkbox', value: [0,1]},
		{title: 'Check Out When Removed', name: 'check_out_when_removed', desc: 'Notify server when profile is removed from device', type: 'checkbox', value: [0,1]},	
		{title: 'Access Rights', name: 'access_rights', desc: 'Access Rights granted to remote administrators', type: 'section', value: []},
		{title: 'General Settings', name: 'general_settings', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Network Settings', name: 'network_settings', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Security Settings', name: 'security_settings', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Restriction Settings', name: 'restriction_settings', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Configuration Profiles', name: 'configuration_profiles', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Provisioning Profiles', name: 'provisioning_profiles', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Apps', name: 'apps', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Add Remove', name: 'add_remove', desc: '', type: 'section', value: []},
		{title: 'Settings', name: 'settings', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Configuration Profiles', name: 'configuration_profiles', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Provisioning Profiles', name: 'provisioning_profiles', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Apps', name: 'apps', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Security', name: 'security', desc: '', type: 'section', value: []},
		{title: 'Change Device Password', name: 'change_device_password', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Remote Wipe', name: 'remote_wipe', desc: '', type: 'checkbox', checked: true, value: 1},
		{title: 'Apple Push Notification Service', name: 'push_notification_service', desc: 'Settings for the Apple Push Notification Service', type: 'section', value: []},
		{title: 'Use Development APNS Server', name: 'use_development_apns_server', desc: '', type: 'checkbox', value: [0,1]}
	]},
	{title: 'APN', name: 'apn', desc: '', type: 'form', value: [
		{title: 'Access Point Name', name: 'access_point_name', desc: 'The name of the carrier (GPRS) access point', type: 'text', value: []},	
		{title: 'Access Point User Name', name: 'access_point_user_name', desc: 'The user name to connect to the access point', type: 'text', value: []},	
		{title: 'Access Point Password', name: 'access_point_password', desc: 'The password to connect to the access point', type: 'password', value: []},
		{title: 'Proxy Server', name: 'proxy_server', desc: '', type: 'text', value: []},
		{title: 'Proxy Server Port', name: 'proxy_server_port', desc: 'The fully qualified address and port of the proxy server', type: 'text', value: 0}	// default 8443
	]}
]