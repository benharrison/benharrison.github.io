window.PasswordGenerator = (function(){
    // private
    var _defaultOptions = {
      length: 10,
      lowercase: true,
      uppercase: true,
      digits: true,
      specialcharacters: true,
      spaces: false,
      brackets: false,
    };

    var _alpha              = 'abcdefghijklmnopqrstuvwxyz';
    var _lowerCase          = _alpha.split('');
    var _upperCase          = _alpha.toUpperCase().split('');
    var _digits             = ('0123456789').split('');
    var _specialCharacters  = ('-_\'"!@#$%^&*()+=~:;|.,').split('');
    var _spaces             = [' '];
    var _brackets           = ('[]{}<>()').split('');

    function mergeObjects(obj1, obj2){
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }

    // Check strength
    var checkStrength = function(password) {
        var strength    = 0,
            hasLower    = false,
            hasUpper    = false;

        strength = Math.min(6, Math.floor(password.length / 8));

        for (var i = 0; i < _lowerCase.length; i++) {
            if ( !hasLower && password.indexOf(_lowerCase[i]) > -1 ) hasLower = true;
            if ( !hasUpper && password.indexOf(_upperCase[i]) > -1 ) hasUpper = true;
            if ( hasLower && hasUpper ) { strength++; break; } // must have BOTH
        }

        for (var i = 0; i < _digits.length; i++) {
            if ( password.indexOf(_digits[i]) > -1 ) { strength++; break; }
        }

        for (var i = 0; i < _specialCharacters.length; i++) {
            if ( password.indexOf(_specialCharacters[i]) > -1 ) { strength++; break; }
        }

        var others = [].concat(_spaces, _brackets);
        for (var i = 0; i < others.length; i++) {
            if ( password.indexOf(others[i]) > -1 ) { strength++; break; }
        }

        return strength;
    }

    var generate = function(options) {
        var settings = mergeObjects(_defaultOptions, options);
        var chars = [];

        if (settings.spaces) chars.push(' ');
        if (settings.lowercase) chars.push(_lowerCase);
        if (settings.uppercase) chars.push(_upperCase);
        if (settings.digits) chars.push(_digits);
        if (settings.specialcharacters) chars.push(_specialCharacters);
        if (settings.brackets) chars.push(_brackets);

        var generatedPassword = '';

        for (var i = 0; i < settings.length; i++)
        {
            var rand1 = Math.floor(Math.random() * chars.length);
            var rand2 = Math.floor(Math.random() * chars[rand1].length);

            var character = chars[rand1][rand2]

            generatedPassword = generatedPassword + character;
        }

        return generatedPassword;
    }

    // public
    return {
        Generate            : generate,
        CheckStrength       : checkStrength
    }
})();